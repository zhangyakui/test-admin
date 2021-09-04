module.exports = app => {
  class UserController extends app.Controller {
    // 列表
    async list(){
      this.ctx.body = await this.service.system.user.list(this.ctx.request.query)
    }

    // 新增
    async add(){
      this.ctx.body = await this.service.system.user.add(this.ctx.request.body)
    }

    // 修改
    async edit(){
      this.ctx.body = await this.service.system.user.edit(this.ctx.request.body)
    }

    // 删除
    async delete(){
      this.ctx.body = await this.service.system.user.delete(this.ctx.request.body)
    }

    // 表格
    async excel(){
      this.ctx.body = await this.service.system.user.excel()
    }
  }
  return UserController
}
