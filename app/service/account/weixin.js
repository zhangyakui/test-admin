module.exports = app => {
  class WeiXinService extends app.Service {
    // 过滤
    async filter(query){
        try{
            return {
                code: 200,
                msg: '成功',
                data: await this.app.model.WeixinAccount.findAll({
                    attributes: [query.name],
                    group: query.name
                })
            }
        }catch{
            return {
                code: 500,
                msg: '服务端错误'
            }
        }
    }

    // 列表
    async list(query){
        // const Op = this.app.Sequelize.Op
        let filter = {}
        if (query.category) filter.category = query.category
        if (query.accountStatus) filter.accountStatus = query.accountStatus
        if (typeof(query.operateStatus) === 'number') filter.operateStatus = query.operateStatus

        try{
            return {
                code: 200,
                msg: '成功',
                data: await this.app.model.WeixinAccount.findAll({
                    where: filter,
                    offset: query.page - 1,
                    limit: query.size,
                    order: [['create_time', 'DESC']]
                })
            }
        }catch{
            return {
                code: 500,
                msg: '服务端错误'
            }
        }
    }

    // 查询
    async search(query){
        try{
            return {
                code: 200,
                msg: '成功',
                data: await this.app.model.WeixinAccount.findAll({
                    where: {
                        [this.app.Sequelize.Op.or]: [
                            {nickName: {[this.app.Sequelize.Op.like]: '%' + query.keyword + '%'}},
                            {account: {[this.app.Sequelize.Op.like]: '%' + query.keyword + '%'}},
                            {password: {[this.app.Sequelize.Op.like]: '%' + query.keyword + '%'}},
                            {uid: {[this.app.Sequelize.Op.like]: '%' + query.keyword + '%'}},
                            {phone: {[this.app.Sequelize.Op.like]: '%' + query.keyword + '%'}},
                            {desc: {[this.app.Sequelize.Op.like]: '%' + query.keyword + '%'}}
                        ]
                    },
                    offset: query.page - 1,
                    limit: query.size,
                    order: [['create_time', 'DESC']]
                })
            }
        }catch{
            return {
                code: 500,
                msg: '服务端错误'
            }
        }
    }

    // 创建
    async create(body){
        try{
            await this.app.model.WeixinAccount.create(body)
            return {
                code: 200,
                msg: '新增成功'
            }
        }catch{
            return {
                code: 201,
                msg: '新增失败'
            }
        }
    }

    // 修改
    async update(body){
        const account = await this.app.model.WeixinAccount.findByPk(body.id)
        if (!account){
            return {
                code: 404,
                msg: '修改失败, 账号不存在'
            }
        }

        await account.update(body)
        return {
            code: 200,
            msg: '修改成功'
        }
    }

    // 删除账号
    async destroy(body){
        const account = await this.app.model.WeixinAccount.findByPk(body.id);
        if (!account) {
            return {
                code: 404,
                msg: '删除失败, 账号不存在'
            }
        }

        await account.destroy()
        return {
            code: 200,
            msg: '删除成功'
        }
    }
  }
  return WeiXinService
}


