module.exports = app => {
  class PhoneService extends app.Service {
    // 列表
    async list(query){
      const {page, size, agent, status, keyword} = query
      let where = {}
      if (agent && agent.length != 0) where.agent = agent// 筛选代理商
      if (status != undefined && status.length != 0) where.status = status// 筛选状态
      if (keyword && keyword.length != 0){// 查询关键词
        where[this.app.Sequelize.Op.or] = [
          {cardName: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {number: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {agent: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {iccid: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {puk: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {local: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {realInfo: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
        ]
      }

      const data = await this.app.model.AccPhone.findAndCountAll({
        where: where,
        offset: (Number(page)- 1) * size,
        limit: Number(size),
        order: [['createTime', 'DESC']]
      })

      const categories = await this.app.model.AccPhone.findAll({
        group: 'agent',
        attributes: ['agent']
      })

      return {
        code: 200,
        data: {
          list: data.rows,
          categories: categories,
          total: data.count
        }
      }
    }

    // 新增
    async add(body){
      try{
        await this.app.model.AccPhone.create(body)
        return {
          code: 200,
          msg: '新增成功'
        }
      }catch{
        return {
          code: 201,
          msg: '新增失败, 编号或号码已存在'
        }
      }
    }

    // 编辑
    async edit(body){
      const {id} = body 
      const phone = await this.app.model.AccPhone.findByPk(id)
      if (!phone) {
        return {
          code: 404,
          msg: '编辑失败, 数据不存在'
        }
      }

      try{
        await phone.update(body)
        return {
          code: 200,
          msg: '编辑成功'
        }
      }catch{
        return {
          code: 201,
          msg: '编辑失败, 编号或号码重复'
        }
      }
    }

    // 删除
    async delete(body){
      const {id} = body 
      const phone = await this.app.model.AccPhone.findByPk(id)
      if (!phone) {
        return {
          code: 404,
          msg: '删除失败, 数据不存在'
        }
      }

      await phone.destroy()
      return {
        code: 200,
        msg: '删除成功'
      }
    }

    // 表格
    async excel(){
      const total = await this.app.model.query('SELECT COUNT(`id`) as `count` FROM `acc_phone`')
      return this.list({page: 1, size: total[0][0].count})
    }
  }
  return PhoneService
}

