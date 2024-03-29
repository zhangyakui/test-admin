module.exports = app => {
    class WeiXinService extends app.Service {
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
            {phone: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {uid: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {abnormal: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
          ]
        }

        const data = await this.app.model.AccWeixin.findAndCountAll({
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
        try{
          await this.app.model.AccWeixin.create(body)
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
        const weixin = await this.app.model.AccWeixin.findByPk(id)
        if (!weixin) {
          return {
            code: 404,
            msg: '编辑失败, 数据不存在'
          }
        }
  
        try{
          await weixin.update(body)
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
        const weixin = await this.app.model.AccWeixin.findByPk(id)
        if (!weixin) {
          return {
            code: 404,
            msg: '删除失败, 数据不存在'
          }
        }
  
        await weixin.destroy()
        return {
          code: 200,
          msg: '删除成功'
        }
      }
  
      // 表格
      async excel(){
        const total = await this.app.model.query('SELECT COUNT(`id`) as `count` FROM `acc_weixin`')
        return this.list({page: 1, size: total[0][0].count})
      }
    }
    return WeiXinService
  }
  
  