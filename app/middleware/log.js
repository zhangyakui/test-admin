module.exports = app => {
    return async (ctx, next) => {
        // 操作模块映射
        const urlMap = {
            '/permission': '登录',

            '/system/user/list': '用户列表',
            '/system/user/excel': '用户表格',
            '/system/user/add': '用户添加',
            '/system/user/edit': '用户编辑',
            '/system/user/delete': '用户删除',

            '/system/role/list': '角色列表',
            '/system/role/add': '角色添加',
            '/system/role/edit': '角色编辑',
            '/system/role/delete': '角色删除',

            '/system/menu/list': '菜单列表',
            '/system/menu/add': '菜单添加',
            '/system/menu/edit': '菜单编辑',
            '/system/menu/delete': '菜单删除',

            '/system/log/list': '日志列表',
            '/system/log/excel': '日志表格',
            '/system/log/delete': '清空日志',
        }
       

        // 写入操作日志
        const method = ctx.method
        const url = ctx.url.split('?')[0]
        const account = ctx.account
        const username = ctx.username
        const actionTitle = urlMap[url]
        const params = method == 'POST' ? ctx.request.body : ctx.request.query
        if (actionTitle){
            ctx.app.model.SysLog.create({
                account: account,
                username: username,
                actionTitle: actionTitle,
                url: url,
                method: method,
                params: JSON.stringify(params)
            })
        }
        await next()
    }
}

