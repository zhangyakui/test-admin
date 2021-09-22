module.exports = app => {
    class QiEHaoController extends app.Controller {
      // 列表
      async list(){
        this.ctx.body = await this.service.account.qiehao.list(this.ctx.request.query)
      }
  
      // 新增
      async add(){
        this.ctx.body = await this.service.account.qiehao.add(this.ctx.request.body)
      }
  
      // 编辑
      async edit(){
        this.ctx.body = await this.service.account.qiehao.edit(this.ctx.request.body)
      }
  
      // 删除
      async delete(){
        this.ctx.body = await this.service.account.qiehao.delete(this.ctx.request.body)
      }
  
      // 表格
      async excel(){
        this.ctx.body = await this.service.account.qiehao.excel()
      }
    }
    return QiEHaoController
  }
  