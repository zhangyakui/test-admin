module.exports = app => {
  class RoleController extends app.Controller {
    // 列表
    async list(){
        const query = this.ctx.query
        this.ctx.validate({
            page: {
                type: 'number',
                required: true,
                desc: '分页'
            },
            size: {
                type: 'number',
                required: true,
                desc: '分页数量'
            }
        }, query)

        this.ctx.body = await this.service.system.role.list(query)

    }

    // 新增
    async add(){
      this.ctx.validate({
          pid: {
              type: 'number',
              required: true,
              desc: '父级id'
          },
          type: {
              type: 'number',
              required: true,
              min: 0,
              max: 1,
              desc: '类型 0 部门 1 职位'
          },
          name: {
            type: 'string',
            required: true,
            desc: '分页'
          },
          desc: {
              type: 'string',
              required: false,
              desc: '分页数量'
          }
      })

      const body = this.ctx.request.body
      this.ctx.body = await this.service.system.role.add(body)
    }

    // 修改
    async edit(){

    }

    // 删除
    async delete(){

    }
  }
  return RoleController
}
