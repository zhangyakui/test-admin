module.exports = app => {
  class MenuController extends app.Controller {
    // 列表
    async list(){
      this.ctx.body = await this.service.system.menu.list() 
    }

    // 新增
    async add(){


    }

    // 修改
    async edit(){


    }

    // 删除
    async delete(){
      
    }
  }
  return MenuController
}
