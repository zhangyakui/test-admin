module.exports = app => {
  class LoginController extends app.Controller {
      async index(){
        this.ctx.validate({
            account:{
                type: 'string',
                required: true
            },
            password: {
                type: 'string',
                required:true
            }
        })

        this.ctx.body = await this.service.login.index(this.ctx.request.body)
      }
  }
  return LoginController
}
