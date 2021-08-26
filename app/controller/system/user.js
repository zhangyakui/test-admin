module.exports = app => {
  class UserController extends app.Controller {
    // 列表
    async list(){
      const query = this.ctx.request.query
      this.ctx.validate({
        page:{
          type:'string',
          required: true,
          desc: '页码'
        },
        size: {
          type: 'string',
          required: true,
          desc: '页码数据量'
        },
        enable: {
          type: 'string',
          min: 0,
          max: 1,
          required: false,
          desc: '状态 0禁用 1启用'
        },
        keyword: {
          type: 'string',
          required: false,
          desc: '搜索关键词'
        }
      }, query)

      this.ctx.body = await this.service.system.user.list(query)
    }

    // 新增
    async add(){
      this.ctx.validate({
        username: {
          type: 'string',
          required: true,
          desc: '用户真实姓名'
        },
        account: {
          type: 'string',
          required: true,
          desc: '账号, 最好用电子邮件'
        },
        password: {
          type: 'string',
          required: true,
          desc: '密码'
        },
        gender: {
          type: 'string',
          min: 1,
          max: 2,
          required: true,
          desc: '性别 1男 2女'
        },
        phone: {
          type: 'string',
          required: false,
          desc: '手机号'
        },
        enable: {
          type: 'string',
          min: 0,
          max: 1, 
          required: true,
          desc: '是否启用'
        },
        rid: {
          type: 'string',
          required: false,
          desc: '角色id绑定'
        },
        desc: {
          type: 'string',
          required: false,
          desc: '备注'
        }
      })

      this.ctx.body = await this.service.system.user.add(this.ctx.request.body)
    }

    // 修改
    async edit(){
      this.ctx.validate({
        uid: {
          type: 'string',
          required: true,
          desc: '用户id'
        },
        password: {
          type: 'string',
          required: false,
          desc: '密码'
        },
        phone: {
          type: 'string',
          required: false,
          desc: '手机号'
        },
        enable: {
          type: 'string',
          min: 0,
          max: 1, 
          required: false,
          desc: '是否启用'
        },
        rid: {
          type: 'string',
          required: false,
          desc: '角色id绑定'
        },
        desc: {
          type: 'string',
          required: false,
          desc: '备注'
        }
      })

      this.ctx.body = await this.service.system.user.edit(this.ctx.request.body)
    }

    // 删除
    async delete(){
      this.ctx.validate({
        uid: {
          type: 'string',
          required: true,
          desc: '用户id'
        }
      })

      this.ctx.body = await this.service.system.user.delete(this.ctx.request.body)
    }
  }
  return UserController
}
