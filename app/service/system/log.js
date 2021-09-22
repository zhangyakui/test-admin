module.exports = app => {
    class LogService extends app.Service {
        // 列表 type: role角色信息 / perm权限信息
        async list(query){
            const {page, size, keyword} = query
            let where = {}
            if (keyword != undefined){// 查询关键词
                where[this.app.Sequelize.Op.or] = [
                {account: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
                {userName: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
                {title: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
                {url: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
                {params: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
                ]
            }

            const data = await this.app.model.SysLog.findAndCountAll({
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
        
        // 删除
        async delete(){
            await this.app.model.SysLog.destroy({truncate: true})
            return {
                code: 200,
                msg: '清空成功'
            }
        }

        // 表格
        async excel(){
            const data = await this.app.model.SysLog.findAll({order: [['createTime', 'DESC']]})
            return {
                code: 200,
                data: {
                list: data,
                total: data.length
                }
            }
        }
    }
    return LogService
  }
  
  
  