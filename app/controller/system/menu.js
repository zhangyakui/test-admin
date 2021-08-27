module.exports = app => {
  class MenuController extends app.Controller {
    // 列表
    async list(){
      this.ctx.body = await this.service.system.menu.list() 
    }

    // 新增
    async add(){
      this.ctx.body = await this.service.system.menu.add(this.ctx.request.body) 
    }

    // 修改
    async edit(){
      this.ctx.body = await this.service.system.menu.edit(this.ctx.request.body) 
    }

    // 删除
    async delete(){
      this.ctx.body = await this.service.system.menu.delete(this.ctx.request.body) 
    }
  }
  return MenuController
}
