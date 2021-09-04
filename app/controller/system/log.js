module.exports = app => {
    class LogController extends app.Controller {
      // 列表 type: role角色信息 / perm权限信息
      async list(){
        this.ctx.body = await this.service.system.log.list(this.ctx.request.query)
      }
  
      // 删除
      async delete(){
        this.ctx.body = await this.service.system.log.delete()
      }

      // 导出表格
      async excel(){
        this.ctx.body = await this.service.system.log.excel()
      }
    }
    return LogController
  }