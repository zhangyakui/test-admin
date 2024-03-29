module.exports = app => {
  class UserService extends app.Service {
    // 列表
    async list(query){
      const {page, size, enable, keyword} = query
      let where = {
        isAdmin: 1,
      }

      if (enable != undefined && enable.length != 0) where.enable = enable// 筛选状态
      if (keyword && keyword.length != 0){// 查询关键词
        where[this.app.Sequelize.Op.or] = [
          {userName: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {account: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {phone: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
        ]
      }

      const userData = await this.app.model.SysUser.findAndCountAll({
        where: where,
        offset: (Number(page)- 1) * size,
        limit: Number(size),
        order: [['createTime', 'DESC']],
        attributes: ['uid', 'userName', 'account', 'gender', 'phone', 'enable', 'desc', 'createTime', 'updateTime']
      })

      let data = []
      for (let idx in userData.rows){
        let _user = Object.assign({}, userData.rows[idx].dataValues)
        // 查询用户角色映射关系
        const {rid} = await this.app.model.SysUserRole.findOne({
          where: {
            uid: _user.uid
          }
        })

        const jobData = await this.app.model.SysRole.findOne({
          where: {
            rid: rid
          }
        })

        const deptData = await this.app.model.SysRole.findOne({
          where: {
            rid: jobData.pid
          }
        })

        _user.jobId = jobData.rid
        _user.jobTitle = jobData.title 
        _user.deptId = deptData.rid
        _user.deptTitle = deptData.title
        data.push(_user)
      }

      return {
        code: 200,
        data: {
          list: data,
          total: userData.count
        }
      }
    }

    // 添加
    async add(body){
      const {account, password, rid} = body

      // 添加用户
      body.password = this.ctx.helper.encrypt(password)// 加密
      body.isAdmin = 1// 普通管理员

      try{
        await this.app.model.SysUser.create(body)
      }catch{
        return {
          code: 201,
          msg: '添加失败, 用户已存在'
        }
      }

      // 写入用户角色关系表
      if (rid){
        const {uid} = await this.app.model.SysUser.findOne({
          where: {
            account: account
          }
        })

        await this.app.model.SysUserRole.create({
          uid: uid,
          rid: rid
        })
      }

      return {
        code: 200,
        msg: '添加成功'
      }
    }

    // 编辑
    async edit(body){
      const {uid, phone, enable, rid, desc} = body
      let update = {}

      // 查询账号是否存在
      const user = await this.app.model.SysUser.findByPk(uid)
      if (!user){
        return {
          code: 404,
          msg: '编辑失败, 用户不存在'
        }
      }

      if (phone) update.phone = phone
      if (enable != undefined) update.enable = enable
      if (desc) update.desc = desc

      await user.update(update)

      // 编辑 用户角色映射
      if (rid){
        const ur = await this.app.model.SysUserRole.findOne({
          where: {
            uid: uid
          }
        })

        if (ur){// 编辑
          await ur.update({rid: rid})
        }else{// 添加
          await this.app.model.SysUserRole.create({uid: uid, rid: rid})
        }
      }
      if (app.config.userPermission[user.account]){// 清除登录记录
        delete app.config.userPermission[user.account]
      }

      return {
        code: 200,
        msg: '编辑成功'
      }
    }

    // 删除
    async delete(body){
      const {uid} = body
      const user = await this.app.model.SysUser.findByPk(uid)
      if (!user){
        return {
          code: 404,
          msg: '编辑失败, 用户不存在'
        }
      }

      await user.destroy()

      // 删除用户角色映射
      const ur = await this.app.model.SysUserRole.findOne({
        where: {
          uid: uid
        }
      })

      if (ur) await ur.destroy()

      if (app.config.userPermission[user.account]){// 清除登录记录
        delete app.config.userPermission[user.account]
      }

      return {
        code: 200,
        msg: '删除成功'
      }
    }
    
    // 表格
    async excel(){
      const total = await this.app.model.query('SELECT COUNT(`uid`) as `count` FROM `sys_user` WHERE `is_admin` = 1')
      return this.list({page: 1, size: total[0][0].count})
    }
  }
  return UserService
}
