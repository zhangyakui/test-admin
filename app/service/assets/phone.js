module.exports = app => {
    class PhoneService extends app.Service {
      // 列表
      async list(query){
        const {page, size, type, status, keyword} = query
  
        let where = {}
        if (type && type.length != 0) where.type = type// 筛选类型
        if (status != undefined && status.length != 0) where.status = status// 筛选状态
        if (keyword && keyword.length != 0){// 查询关键词
          where[this.app.Sequelize.Op.or] = [
            {phoneId: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {name: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {brand: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {model: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {sysVer: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {memory: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {disk: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {devNum: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
          ]
        }
  
        // 全部数据
        const data = await this.app.model.MobPhone.findAndCountAll({
          where: where,
          offset: (Number(page)- 1) * size,
          limit: Number(size),
          order: [['updateTime', 'DESC']]
        })

        // 品牌
        const brands = await this.app.model.MobPhone.findAll({
          group: 'brand',
          attributes: ['brand']
        })

        // 型号
        const models = await this.app.model.MobPhone.findAll({
          group: 'model',
          attributes: ['model']
        })

        return {
          code: 200,
          data: {
            list: data.rows,
            models,
            brands,
            total: data.count
          }
        }
      }
  
      // 新增
      async add(body){
        try{
          await this.app.model.MobPhone.create(body)
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
        const mob = await this.app.model.MobPhone.findByPk(id)
        if (!mob) {
          return {
            code: 404,
            msg: '编辑失败, 数据不存在'
          }
        }
  
        try{
          await mob.update(body)
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
        const mob = await this.app.model.MobPhone.findByPk(id)
        if (!mob) {
          return {
            code: 404,
            msg: '删除失败, 数据不存在'
          }
        }
  
        await mob.destroy()
        return {
          code: 200,
          msg: '删除成功'
        }
      }
  
      // 表格
      async excel(){
        const total = await this.app.model.query('SELECT COUNT(`id`) as `count` FROM `mob_phone`')
        return this.list({page: 1, size: total[0][0].count})
      }
    }
    return PhoneService
  }
  
  
  
  