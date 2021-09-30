module.exports = app => {
    class ReimburseService extends app.Service {
        // 列表
        async list(account, query){
            const {page, size, type} = query
            let where = {}
            if (type == 'apply'){
                where.applyAccount = account
                where.status = {[this.app.Sequelize.Op.in]: [0, 1, 2]}

            }else if (type == 'examine'){// 普通用户不开放 审核功能
                if (app.config.userPermission[account].perms.indexOf('approve:reimburse:adopt') == -1) return {code: 403, msg: '您无权限查看'}
                where.status = {[this.app.Sequelize.Op.in]: [2]}

            }else if (type == 'settlement'){// 普通用户不开放 结算功能
                if (app.config.userPermission[account].perms.indexOf('approve:reimburse:reject') == -1) return {code: 403, msg: '您无权限查看'}
                where.status = {[this.app.Sequelize.Op.in]: [3]}

            }else if (type == 'recode'){// 普通用户不开放 导出功能
                if (app.config.userPermission[account].perms.indexOf('approve:reimburse:excel') == -1){
                    where.applyAccount = account
                }
                where.status = {[this.app.Sequelize.Op.in]: [4]}
            }
            // if (keyword && keyword.length != 0){// 查询关键词
            //   where[this.app.Sequelize.Op.or] = [
            //     {phoneId: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            //     {name: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            //     {brand: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            //     {model: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            //     {sysVer: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            //     {memory: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            //     {disk: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            //     {devNum: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            //     {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
            //   ]
            // }
            // 全部数据 
            const data = await this.app.model.ApprReimburse.findAndCountAll({
                where: where,
                offset: (Number(page)- 1) * size,
                limit: Number(size),
                order: [['updateTime', 'DESC']],
            })
    
            return {
                code: 200,
                data: {
                    list: data.rows,
                    total: data.count
                }
            }
        }
    
        // // 申请
        // async add(body){
        //     try{
        //     await this.app.model.AssPhone.create(body)
        //     return {
        //         code: 200,
        //         msg: '新增成功'
        //     }
        //     }catch{
        //     return {
        //         code: 201,
        //         msg: '新增失败, 数据已存在'
        //     }
        //     }
        // }
        
        // // 提交
        // async submit(body){

        // }

        // // 编辑
        // async edit(body){
        //     const {id} = body 
        //     const mob = await this.app.model.AssPhone.findByPk(id)
        //     if (!mob) {
        //     return {
        //         code: 404,
        //         msg: '编辑失败, 数据不存在'
        //     }
        //     }
    
        //     try{
        //     await mob.update(body)
        //     return {
        //         code: 200,
        //         msg: '编辑成功'
        //     }
        //     }catch{
        //     return {
        //         code: 201,
        //         msg: '编辑失败, 数据重复'
        //     }
        //     }
        // }
    
        // // 删除
        // async delete(body){
        //     const {id} = body 
        //     const mob = await this.app.model.AssPhone.findByPk(id)
        //     if (!mob) {
        //     return {
        //         code: 404,
        //         msg: '删除失败, 数据不存在'
        //     }
        //     }
    
        //     await mob.destroy()
        //     return {
        //         code: 200,
        //         msg: '删除成功'
        //     }
        // }

        // // 通过
        // async adopt(body){

        // }

        // // 驳回
        // async reject(body){

        // }

        // // 结算
        // async settlement(body){

        // }
  
        // // 表格
        // async excel(){
        //     const total = await this.app.model.query('SELECT COUNT(`id`) as `count` FROM `appr_reimburse`')
        //     return this.list({page: 1, size: total[0][0].count})
        // }
    }
    return ReimburseService
  }
  
  
  
  