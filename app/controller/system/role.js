module.exports = app => {
  class RoleController extends app.Controller {
    // 列表
    async list(){
        this.ctx.body = await this.service.system.role.list()
    }

    // 权限映射列表
    async mlist(){
      const query = this.ctx.request.query
      this.ctx.validate({
        rid: {
          type: 'number',
          required: true,
          desc: '序列'
        },
        type: {
          type: 'number',
          min:0,
          max:1,
          required: true,
          desc: '类型'
        }
      }, query)

      this.ctx.body = await this.service.system.role.mlist(query)
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
              min:0,
              max:1,
              required: true,
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
            desc: '部门/职位 描述'
          },
          mlist:{
            type: 'string',
            required: false,
            desc: '权限标识列表 需格式化成字符串'
          }
      })

      this.ctx.body = await this.service.system.role.add(this.ctx.request.body)
    }

    // 修改
    async edit(){
      this.ctx.validate({
        rid: {
          type: 'number',
          required: true,
          desc: '序列'
        },
        type: {
          type: 'number',
          min:0,
          max:1,
          required: true,
          desc: '类型'
        },
        name: {
          type: 'string',
          required: false,
          desc: '名称'
        },
        desc: {
          type: 'string',
          required: false,
          desc: '描述'
        },
        mlist: {
          type: 'string',
          required: false,
          desc: '权限标识列表 需格式化成字符串'
        }
      })

      this.ctx.body = await this.service.system.role.edit(this.ctx.request.body)
    }

    // 删除
    async delete(){
      this.ctx.validate({
        rid: {
          type: 'number',
          required: true,
          desc: '序列'
        },
        type: {
          type: 'number',
          min:0,
          max:1,
          required: true,
          desc: '类型'
        }
      })

      this.ctx.body = await this.service.system.role.delete(this.ctx.request.body)
    }
  }
  return RoleController
}
