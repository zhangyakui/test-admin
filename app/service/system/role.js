module.exports = app => {
  class RoleService extends app.Service {
    // 列表
    async list(query){
      const {type, rid} = query
      let data = []
      if (type == 'role'){// 角色信息
        const roleData = await this.app.model.SysRole.findAll()
        let _dept = []
        let _job = []
        roleData.forEach(item => {
            if (item.type == 0){// 部门
              _dept.push(item)
            }else if (item.type == 1){// 职位
              _job.push(item)
            }
        })
  
        for (let i=0; i<_dept.length; i++){// 遍历部门
          let roleObj = {
            rid: _dept[i].rid,
            type: _dept[i].type,
            name: _dept[i].name,
            desc: _dept[i].desc,
            children: []
          }
          let rid = _dept[i].rid
          for (let j=0; j<_job.length; j++){// 遍历职位
            if (_job[j].pid == rid){
              roleObj.children.push({
                rid: _job[j].rid,
                type: _job[j].type,
                name: _job[j].name,
                desc: _job[j].desc,
              })
            }
          }
          data.push(roleObj)
        }
      }else if((type == 'perm') && rid){// 权限信息
        const rmData = await this.app.model.SysRoleMenu.findAll({
          where: {
            rid: rid
          },
          attributes: ['mid']
        })

        if (rmData.length == 0){
          return {
            code: 404,
            msg: '未查询到对应的权限'
          }
        }

        rmData.forEach(item => {
          data.push(item.mid)
        })
      }

      return {
        code: 200,
        data: data
      }
    }

    // 新增 部门新增, 职位需新增关系映射
    async add(body){
      const {type, name, mlist} = body
      // 新增角色信息
      try{
        await this.app.model.SysRole.create(body)
      }catch{
        return {
          code: 201,
          msg: '新增失败, 部门/职位已存在'
        }
      }

      // 判断如果是角色, 新增映射信息
      if (type == 1){
        // 查询 新增角色 pid 
        const {rid} = await this.app.model.SysRole.findOne({
          where: {
            name: name
          },
          attributes: ['rid']
        })

        // 新增映射
        JSON.parse(mlist).forEach(async mid => {
          await this.app.model.SysRoleMenu.create({
            rid: rid,
            mid: mid
          })
        }) 
      }

      return {
        code: 200,
        msg: '新增成功'
      }
    }

    // 修改
    async edit(body){
      const {rid, type, mlist} = body
      // 查询数据是否存在
      const role = await this.app.model.SysRole.findByPk(rid)

      if (!role){
        return {
          code: 404,
          msg: '修改失败, 数据不存在'
        }
      }

      // 修改 角色信息
      try{
        await role.update(body)
      }catch{
        return {
          code: 201,
          msg: '修改失败, 字段重复'
        }
      }

      // 删除并重建映射关系
      if ((mlist) && (type == 1)){
        // 删除
        const roleMenu = await this.app.model.SysRoleMenu.findAll({
          where: {
            rid: rid
          }
        })
        if (roleMenu) {
          roleMenu.forEach(async data => {
            await data.destroy()
          })
        }

        // 重建
        JSON.parse(mlist).forEach(async mid=> {
          await this.app.model.SysRoleMenu.create({
            rid: rid,
            mid: mid
          })
        })
      }

      return {
        code: 200,
        msg: '修改成功'
      }
    }

    // 删除
    async delete(body){
      const {rid, type} = body

      const data = await this.app.model.SysRole.findByPk(rid)
      if (!data){
        return {
          code: 404,
          msg: '删除失败, 数据不存在'
        }
      }

      if (type == 0){// 删除部门 无职位
        // 查询是否存在职位数据
        const deptData = await this.app.model.SysRole.findOne({
          where: {
            pid: rid
          }
        })

        if (deptData){
          return {
            code: 201,
            msg: '删除失败, 当前部门下存在职位, 请先删除全部职位'
          }
        }
      }else if (type == 1){// 删除职位 无用户映射
        // 查询是否绑定过用户
        const user = await this.app.model.SysUserRole.findOne({
          where: {
            rid: rid
          }
        })

        if (user){
          return {
            code: 201,
            msg: '删除失败, 当前职位下存在用户, 请先解绑全部用户'
          }
        }
      }   
      
      // 删除角色菜单映射关系
      const roleMenu = await this.app.model.SysRoleMenu.findAll({
        where: {
          rid: rid
        }
      })
      if (roleMenu) {
        roleMenu.forEach(async data => {
          await data.destroy()
        })
      }

      await data.destroy()

      return {
        code: 200,
        msg: '删除成功'
      }
    }
  }
  return RoleService
}


