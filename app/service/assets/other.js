module.exports = app => {
    class OtherService extends app.Service {
      // 列表
      async list(query){
        const {page, size, keyword} = query
        let where = {}
        if (keyword && keyword.length != 0){// 查询关键词
          where[this.app.Sequelize.Op.or] = [
            {category: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {brand: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {specs: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
          ]
        }
  
        // 全部数据
        const data = await this.app.model.AssOther.findAndCountAll({
          where: where,
          offset: (Number(page)- 1) * size,
          limit: Number(size),
          order: [['updateTime', 'DESC']]
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
          await this.app.model.AssOther.create(body)
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
        const mob = await this.app.model.AssOther.findByPk(id)
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
        const mob = await this.app.model.AssOther.findByPk(id)
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
        const total = await this.app.model.query('SELECT COUNT(`id`) as `count` FROM `ass_other`')
        return this.list({page: 1, size: total[0][0].count})
      }
    }
    return OtherService
  }
  