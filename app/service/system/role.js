module.exports = app => {
  class RoleService extends app.Service {
    // 列表
    async list(query){
      const roleData = await this.app.model.SysRole.findAll()
      return {
        code: 200,
        data: roleData
      }
    }

    // 新增 此处涉及绑定权限功能, 需要先获取 树形权限结构 然后根据id值 做角色和关系映射
    async add(body){
      const {pid, type, name, desc} = body
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

      try{
        await this.app.model.SysRole.create({
          pid: pid,
          type: type,
          name: name,
          desc: desc
        })
      }catch{
        return {
          code: 500,
          msg: '新增失败, 服务端错误'
        }
      }

      return {
        code: 200,
        msg: '新增成功'
      }
    }

    
  }
  return RoleService
}


