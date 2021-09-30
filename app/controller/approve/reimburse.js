module.exports = app => {
    class ReimburseController extends app.Controller {
        // 列表
        async list(){
            this.ctx.body = await this.service.approve.reimburse.list(this.ctx.account, this.ctx.request.query)
        }
    
        // // 申请
        // async add(){
        //     this.ctx.body = await this.service.approve.reimburse.add(this.ctx.request.body)
        // }
    
        // // 提交
        // async submit(){
        //     this.ctx.body = await this.service.approve.reimburse.submit(this.ctx.request.body)
        // }

        // // 编辑
        // async edit(){
        //     this.ctx.body = await this.service.approve.reimburse.submit(this.ctx.request.body)
        // }
  
        // // 删除
        // async delete(){
        //     this.ctx.body = await this.service.approve.reimburse.delete(this.ctx.request.body)
        // }

        // // 通过
        // async adopt(){
        //     this.ctx.body = await this.service.approve.reimburse.adopt(this.ctx.request.body)
        // }

        // // 驳回
        // async reject(){
        //     this.ctx.body = await this.service.approve.reimburse.reject(this.ctx.request.body)
        // }

        // // 结算
        // async settlement(){
        //     this.ctx.body = await this.service.approve.reimburse.settlement(this.ctx.request.body)
        // }
    
        // // 表格
        // async excel(){
        //     this.ctx.body = await this.service.approve.reimburse.excel()
        // }
    }
    return ReimburseController
}
  