module.exports = app => {
    return async (ctx, next) => {
        if(!ctx.app.config.jwt.whiteList.some(item=>item==ctx.request.url)){//判断接口路径是否在白名单
            const token = ctx.request.header.authorization//拿到token
            if(token){//如果token存在
                await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret, async (error, decoded) => {
                    if (error){
                        ctx.body={
                            code: 401,
                            msg: 'token已过期'
                        }
                        return
                    }

                    ctx.account=decoded.account// 把接口带来的用户名存在ctx上，方便后续做判断。
                    ctx.userName=decoded.userName// 真实姓名
                    // 判断该账号是否在登录列表里(未登录/修改过密码)
                    if (!ctx.app.config.userPermission[ctx.account]){
                        ctx.body={
                            code: 401,
                            msg: 'token已过期'
                        }
                        return
                    }

                    // console.log('========== 鉴权 ==========\n-->> 用户: ', ctx.account, '\n-->> 接口: ', ctx.request.url, '\n========== 鉴权 ==========')
                    // 接口鉴权 除超级管理员以外的所有账号
                    if ((ctx.request.url != '/api/permission') && (ctx.account != 'nannan')){
                        const permission = ctx.request.url.replace('/api', '').split('?')[0].substring(1).replace(/\//g, ':')
                        if (ctx.app.config.userPermission[ctx.account].perms.indexOf(permission) == -1){
                            ctx.body = {
                                code: 403,
                                msg: '您没有权限访问此接口'
                            }
                            return
                        }
                    }
                    await next()
                })
            }else{
                ctx.body = {
                    code: 401,
                    msg: 'token不存在'
                }
                return
            }
        }else{
            await next()
        }
    }
}
