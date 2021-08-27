module.exports = app => {
  class UserService extends app.Service {
    // 列表
    async list(query){
      const {page, size, enable, keyword} = query
      let where = {
        isAdmin: 2,
      }
      if (enable != undefined) where.enable = enable// 过滤状态
      if (keyword != undefined){// 查询关键词
        where[this.app.Sequelize.Op.or] = [
          {username: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {account: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {phone: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
          {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
        ]
      }

      const data = await this.app.model.SysUser.findAll({
        where: where,
        offset: (Number(page)- 1) * 10,
        limit: Number(size),
        order: [['createTime', 'DESC']]
      })
      return {
        code: 200,
        data: {
          list: data,
          total: data.length
        }
      }
    }

    // 新增
    async add(body){
      const {account, password, rid} = body

      // 新增用户
      body.password = this.ctx.helper.encrypt(password)// 加密
      body.isAdmin = 2// 普通管理员

      try{
        await this.app.model.SysUser.create(body)
      }catch{
        return {
          code: 201,
          msg: '新增失败, 用户已存在'
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
        msg: '新增成功'
      }
    }

    // 修改
    async edit(body){
      const {uid, password, phone, enable, rid, desc} = body
      let update = {}

      // 查询账号是否存在
      const user = await this.app.model.SysUser.findByPk(uid)
      if (!user){
        return {
          code: 404,
          msg: '修改失败, 用户不存在'
        }
      }

      if (phone) update.phone = phone
      if (enable != undefined) update.enable = enable
      if (desc) update.desc = desc

      // 判断密码是否修改
      let isChangePwd = false
      if (password){
        const flag = this.ctx.helper.decrypt(password, user.password)// 是否修改密码
        if (!flag){
          update.password = this.ctx.helper.encrypt(password)// 新密码加密
          isChangePwd = true
        }
      }

      await user.update(update)

      // 修改 用户角色映射
      if (rid){
        const ur = await this.app.model.SysUserRole.findOne({
          where: {
            uid: uid
          }
        })

        if (ur){// 修改
          await ur.update({rid: rid})
        }else{// 新增
          await this.app.model.SysUserRole.create({uid: uid, rid: rid})
        }
        
        if ((isChangePwd) && app.config.userPermission[user.account]){// 清除登录记录
          delete app.config.userPermission[user.account]
        }
      }

      return {
        code: 200,
        msg: '修改成功'
      }
    }

    // 删除
    async delete(body){
      const {uid} = body
      const user = await this.app.model.SysUser.findByPk(uid)
      if (!user){
        return {
          code: 404,
          msg: '修改失败, 用户不存在'
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

      return {
        code: 200,
        msg: '删除成功'
      }
    }
  }
  return UserService
}
