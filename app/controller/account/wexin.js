module.exports = app => {
  class WeiXinController extends app.Controller {
    // 获取分类
    async filter(){
      const query = this.ctx.query
      this.ctx.validate({
        name: {
          type: 'string',
          enum: ['category', 'accountStatus'],
          required: true,
          desc: '分类 根据参数可获取 分类类别, 账号状态列表'
        }
      }, query)

      this.ctx.body = await this.service.account.weixin.filter(query)
    }

    // 列表
    async list(){
      const query = this.ctx.query
      this.ctx.validate({
        category: {
          type: 'string',
          required: false,
          desc: '分类'
        },
        accountStatus: {
          type: 'string',
          required: false,
          desc: '账号状态'
        },
        operateStatus: {
          type: 'number',
          required: false,
          desc: '运营状态'
        },
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
      this.ctx.body = await this.service.account.weixin.list(query)
    }

    // 查询
    async search(){
      const query = this.ctx.query
      this.ctx.validate({
        keyword: {
          type: 'string',
          required: true,
          desc: '模糊查询 查找范围 nickName/account/password/uid/phone/desc'
        },
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

      this.ctx.body = await this.service.account.weixin.search(query)
    }

    // 创建
    async create(){
      this.ctx.validate({
        category: {
          type: 'string',
          required: true,
          desc: '账号分类'
        },
        headUrl: {
          type: 'string',
          required: false,
          desc: '头像链接'
        },
        nickName: {
          type: 'string',
          required: false,
          desc: '昵称'
        },
        account: {
          type: 'string',
          required: true,
          desc: '账号'
        },
        password: {
          type: 'string',
          required: true,
          desc: '密码'
        },
        uid: {
          type: 'string',
          required: true,
          desc: '微信唯一标识'
        },
        phone: {
          type: 'string',
          required: false,
          desc: '绑定手机号'
        },
        accountStatus: {
          type: 'string',
          required: true,
          desc: '账号状态'
        },
        operateStatus: {
          type: 'string',
          required: true,
          desc: '运营状态'
        },
        desc: {
          type: 'string',
          required: false,
          desc: '备注'
        }
      })

      this.ctx.body = await this.service.account.weixin.create(this.ctx.request.body)
    }

    // 修改
    async update(){
      this.ctx.validate({
        id: {
          type: 'number',
          required: true,
          desc: 'id  可修改参数: category, headUrl, nickName, account, password, uid, phone, accountStatus, operateStatus, desc'
        }
      })

      this.ctx.body = await this.service.account.weixin.update(this.ctx.request.body)
    }

    // 删除
    async destroy(){
      this.ctx.validate({
        id: {
          type: 'number',
          required: true,
          desc: '删除必选参数'
        }
      })

      this.ctx.body = await this.service.account.weixin.destroy(this.ctx.request.body)
    }

  }
  return WeiXinController
}   
