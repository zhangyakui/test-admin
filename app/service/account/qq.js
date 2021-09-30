module.exports = app => {
    class QQService extends app.Service {
      // 列表
      async list(query){
        const {page, size, status, keyword} = query

        let where = {}
        if (status != undefined && status.length != 0) where.status = status// 筛选状态
        if (keyword && keyword.length != 0){// 查询关键词
          where[this.app.Sequelize.Op.or] = [
            {nickName: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {account: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {password: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {level: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {phone: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {abnormal: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
          ]
        }

        const data = await this.app.model.AccQq.findAndCountAll({
          where: where,
          offset: (Number(page)- 1) * size,
          limit: Number(size),
          order: [['createTime', 'DESC']]
        })

        return {
          code: 200,
          data: {
            list: data.rows,
            total: data.count
          }
        }
      }
  
      // 新增
      async add(body){
        const {account} = body
        // const api = `https://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${account}`// 官方api 昵称乱码未解决
        const api = `https://tenapi.cn/qqname/?qq=${account}`// qq三方api
        const rsp = await app.curl(api, {
          dataType: 'json',
          timeout: 3000,
        })

        // 查询正确 官方返回值
        // if (rsp.data.indexOf('portraitCallBack') != -1){
        //   const qqData = JSON.parse(/portraitCallBack\((\S*)\)/.exec(rsp.data)[1])
        //   body.headUrl = `http://q1.qlogo.cn/g?b=qq&nk=${account}&s=100`
        //   body.nickName = qqData[account][6]
        // }

        // 查询正确 三方返回值
        if (rsp.data.code == 200){
          body.nickName = rsp.data.name
          body.avatarUrl = rsp.data.imgurl
        }

        try{
          await this.app.model.AccQq.create(body)
          return {
            code: 200,
            msg: '新增成功'
          }
        }catch{
          return {
            code: 201,
            msg: '新增失败, 账号已存在'
          }
        }
      }
  
      // 编辑
      async edit(body){
        const {id} = body 
        const qq = await this.app.model.AccQq.findByPk(id)
        if (!qq) {
          return {
            code: 404,
            msg: '编辑失败, 数据不存在'
          }
        }
  
        try{
          await qq.update(body)
          return {
            code: 200,
            msg: '编辑成功'
          }
        }catch{
          return {
            code: 201,
            msg: '编辑失败, 账号重复'
          }
        }
      }
  
      // 删除
      async delete(body){
        const {id} = body 
        const qq = await this.app.model.AccQq.findByPk(id)
        if (!qq) {
          return {
            code: 404,
            msg: '删除失败, 数据不存在'
          }
        }
  
        await qq.destroy()
        return {
          code: 200,
          msg: '删除成功'
        }
      }
  
      // 表格
      async excel(){
        const total = await this.app.model.query('SELECT COUNT(`id`) as `count` FROM `acc_qq`')
        return this.list({page: 1, size: total[0][0].count})
      }
    }
    return QQService
  }
  
  