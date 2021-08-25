module.exports = app => {
  class PermissionController extends app.Controller {
    // 获取菜单信息
    async index(){
      this.ctx.body = await this.service.permission.index(this.ctx.account)
    }
  }
  return PermissionController
}



