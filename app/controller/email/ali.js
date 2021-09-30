module.exports = app => {
    class AliController extends app.Controller {
      // 列表
      async list(){
        this.ctx.body = await this.service.email.ali.list(this.ctx.request.query)
      }
  
      // 新增
      async add(){
        this.ctx.body = await this.service.email.ali.add(this.ctx.request.body)
      }
  
      // 编辑
      async edit(){
        this.ctx.body = await this.service.email.ali.edit(this.ctx.request.body)
      }
  
      // 删除
      async delete(){
        this.ctx.body = await this.service.email.ali.delete(this.ctx.request.body)
      }
  
      // 表格
      async excel(){
        this.ctx.body = await this.service.email.ali.excel()
      }

      // 获取邮箱列表
      async email(){
        this.ctx.body = await this.service.email.ali.email(this.ctx.request.body)
      }
    }
    return AliController
  }
  