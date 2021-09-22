module.exports = app => {
    class ZhiHuService extends app.Service {
      // 列表
      async list(query){
        const {page, size, category, platform, status, keyword} = query

        let where = {}
        if (category && category.length != 0) where.category = category// 筛选分类
        if (platform && platform.length != 0) where.platform = platform// 筛选镜像平台
        if (status != undefined && status.length != 0) where.status = status// 筛选状态
        if (keyword && keyword.length != 0){// 查询关键词
          where[this.app.Sequelize.Op.or] = [
            {nickName: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {account: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {password: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {phone: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {abnormal: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {userInfo: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {homeLink: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {homeInfo: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
          ]
        }

        // 全部数据
        const data = await this.app.model.AccZhihu.findAndCountAll({
          where: where,
          offset: (Number(page)- 1) * size,
          limit: Number(size),
          order: [['createTime', 'DESC']]
        })

        let _data = [] // 过滤数据
        data.rows.forEach(row => {
          let _row = row 
          if (_row.cookies) _row.cookies = JSON.parse(row.cookies)
          if (_row.userInfo) _row.userInfo = JSON.parse(row.userInfo)
          if (_row.worksInfo) _row.worksInfo = JSON.parse(row.worksInfo)
          if (_row.homeInfo) _row.homeInfo = JSON.parse(row.homeInfo)
          _data.push(_row)
        })

        // 分类
        const categories = await this.app.model.AccZhihu.findAll({
          group: 'category',
          attributes: ['category']
        })

        // 平台
        const platforms = await this.app.model.AccZhihu.findAll({
          group: 'platform',
          attributes: ['platform']
        })

        return {
          code: 200,
          data: {
            list: _data,
            categories: categories,
            platforms: platforms,
            total: data.count
          }
        }
      }
  
      // 新增
      async add(body){
        if (body.userInfo){
          body.nickName = JSON.parse(body.userInfo).name
        }
        
        try{
          await this.app.model.AccZhihu.create(body)
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
        const zhihu = await this.app.model.AccZhihu.findByPk(id)
        if (!zhihu) {
          return {
            code: 404,
            msg: '编辑失败, 数据不存在'
          }
        }

        try{
          await zhihu.update(body)
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
        const zhihu = await this.app.model.AccZhihu.findByPk(id)
        if (!zhihu) {
          return {
            code: 404,
            msg: '删除失败, 数据不存在'
          }
        }
  
        await zhihu.destroy()
        return {
          code: 200,
          msg: '删除成功'
        }
      }
  
      // 表格
      async excel(){
        const total = await this.app.model.query('SELECT COUNT(`id`) as `count` FROM `acc_zhihu`')
        return this.list({page: 1, size: total[0][0].count})
      }
    }
    return ZhiHuService
  }
  
  

