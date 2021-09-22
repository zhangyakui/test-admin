module.exports = app => {
  class PhoneController extends app.Controller {
    // 列表
    async list(){
      this.ctx.body = await this.service.assets.phone.list(this.ctx.request.query)
    }

    // 新增
    async add(){
      this.ctx.body = await this.service.assets.phone.add(this.ctx.request.body)
    }

    // 编辑
    async edit(){
      this.ctx.body = await this.service.assets.phone.edit(this.ctx.request.body)
    }

    // 删除
    async delete(){
      this.ctx.body = await this.service.assets.phone.delete(this.ctx.request.body)
    }

    // 表格
    async excel(){
      this.ctx.body = await this.service.assets.phone.excel()
    }
  }
  return PhoneController
}
