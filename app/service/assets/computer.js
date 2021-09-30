module.exports = app => {
    class ComputerService extends app.Service {
      // 列表
      async list(query){
        const {page, size, category, status, keyword} = query
  
        let where = {}
        if (category && category.length != 0) where.category = category// 筛选品类
        if (status != undefined && status.length != 0) where.status = status// 筛选状态
        if (keyword && keyword.length != 0){// 查询关键词
          where[this.app.Sequelize.Op.or] = [
            {computerId: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {brand: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {model: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {specs: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
          ]
        }
  
        // 全部数据
        const data = await this.app.model.AssComputer.findAndCountAll({
          where: where,
          offset: (Number(page)- 1) * size,
          limit: Number(size),
          order: [['updateTime', 'DESC']]
        })

        // 品类
        const categories = await this.app.model.AssComputer.findAll({
          group: 'category',
          attributes: ['category']
        })
        
        // 品牌
        const brands = await this.app.model.AssComputer.findAll({
          group: 'brand',
          attributes: ['brand']
        })

        // 型号
        const models = await this.app.model.AssComputer.findAll({
          group: 'model',
          attributes: ['model']
        })

        return {
          code: 200,
          data: {
            list: data.rows,
            categories: categories,
            models: models,
            brands: brands,
            total: data.count
          }
        }
      }
  
      // 新增
      async add(body){
        try{
          await this.app.model.AssComputer.create(body)
          return {
            code: 200,
            msg: '新增成功'
          }
        }catch{
          return {
            code: 201,
            msg: '新增失败, 数据已存在'
          }
        }
      }
  
      // 编辑
      async edit(body){
        const {id} = body 
        const mob = await this.app.model.AssComputer.findByPk(id)
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
            msg: '编辑失败, 数据重复'
          }
        }
      }
  
      // 删除
      async delete(body){
        const {id} = body 
        const mob = await this.app.model.AssComputer.findByPk(id)
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
        const total = await this.app.model.query('SELECT COUNT(`id`) as `count` FROM `ass_computer`')
        return this.list({page: 1, size: total[0][0].count})
      }
    }
    return ComputerService
  }
  