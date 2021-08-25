module.exports = app => {
  class RoleService extends app.Service {
    // 列表
    async list(){
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

      let roles = []
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
        roles.push(roleObj)
      }

      return {
        code: 200,
        data: roles
      }
    }

    // 获取权限映射列表
    async mlist(query){
      const {rid, type} = query
      if (type != 1){// 非 职位
        return {
          code: 200,
          data: []
        }
      }

      const rmData = await this.app.model.SysRoleMenu.findAll({
        where: {
          rid: rid
        },
        attributes: ['mid']
      })

      let midList = []
      rmData.forEach(item => {
        midList.push(item.mid)
      })

      return {
        code: 200,
        data: midList
      }
    }

    // 新增 部门新增, 职位需新增关系映射
    async add(body){
      const {pid, type, name, mlist, desc} = body
      // 查询 名称是否存在
      const isExists = await this.app.model.SysRole.findOne({
        where:{
          name: name
        }
      })

      // 名称存在
      if (isExists){
        return {
          code: 201,
          msg: '新增失败, 名称已存在'
        }
      }

      // 新增角色信息
      await this.app.model.SysRole.create({
        pid: pid,
        type: type,
        name: name,
        desc: desc
      })

      // 判断如果是角色, 新增映射信息
      if ((type == 1) && mlist){
        // 查询 新增角色 pid 
        const {rid} = await this.app.model.SysRole.findOne({
          where: {
            name: name
          },
          attributes: ['rid']
        })

        // 新增映射
        JSON.parse(mlist).forEach(async mid => {
          console.log('新增映射: ',rid, '----', mid)
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
      const {rid, type, name, desc, mlist} = body
      // 查询数据是否存在
      const role = await this.app.model.SysRole.findByPk(rid)

      if (!role){
        return {
          code: 404,
          msg: '修改失败, 数据不存在'
        }
      }

      // 检查是否需要修改名称
      if ((name) && (role.name != name)){
        // 查询 名称是否存在
        const role2 = await this.app.model.SysRole.findOne({
          where:{
            name: name
          }
        })

        if (role2){
          return {
            code: 201,
            msg: '修改失败, 名称已存在'
          }
        }
      }
      
      // 修改 角色信息
      await role.update({
        name: name,
        desc: desc
      })

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
      if (type == 0){// 删除部门 无职位

        const dept = await this.app.model.SysRole.findByPk(rid)
        if (!dept){
          return {
            code: 404,
            msg: '删除失败, 数据不存在'
          }
        }

        // 查询是否存在职位数据
        const deptData = await this.app.model.SysRole.findOne({
          where: {
            pid: rid
          }
        })

        if (deptData){
          return {
            code: 201,
            msg: '删除失败, 当前部门存在职位, 请先删除全部职位'
          }
        }
        await dept.destroy()

        return {
          code: 200,
          msg: '删除成功'
        }

      }else if (type == 1){// 删除职位 无用户映射
        // 查询是否绑定过用户


      }     

      
    }
















  }
  return RoleService
}


