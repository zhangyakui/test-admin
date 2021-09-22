module.exports = app => {
  class RoleController extends app.Controller {
    // 列表 type: role角色信息 / perm权限信息
    async list(){
      this.ctx.body = await this.service.system.role.list(this.ctx.request.query)
    }

    // 新增
    async add(){
      this.ctx.body = await this.service.system.role.add(this.ctx.request.body)
    }

    // 编辑
    async edit(){
      this.ctx.body = await this.service.system.role.edit(this.ctx.request.body)
    }

    // 删除
    async delete(){
      this.ctx.body = await this.service.system.role.delete(this.ctx.request.body)
    }
  }
  return RoleController
}