module.exports = app => {
  class MenuController extends app.Controller {
    // 列表
    async list(){
      this.ctx.body = await this.service.system.menu.list() 
    }
  }
  return MenuController
}
