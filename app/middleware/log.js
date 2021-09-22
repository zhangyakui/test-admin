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
            '/system/log/delete': '日志清空',

            '/assets/phone/list': '手机列表',
            '/assets/phone/add': '手机添加',
            '/assets/phone/edit': '手机编辑',
            '/assets/phone/delete': '手机删除',
            '/assets/phone/excel': '手机表格',

            '/account/phone/list': '手机号列表',
            '/account/phone/add': '手机号添加',
            '/account/phone/edit': '手机号编辑',
            '/account/phone/delete': '手机号删除',
            '/account/phone/excel': '手机号表格',

            '/account/qq/list': 'QQ号列表',
            '/account/qq/add': 'QQ号添加',
            '/account/qq/edit': 'QQ号编辑',
            '/account/qq/delete': 'QQ号删除',
            '/account/qq/excel': 'QQ号表格',

            '/account/weixin/list': '微信号列表',
            '/account/weixin/add': '微信号添加',
            '/account/weixin/edit': '微信号编辑',
            '/account/weixin/delete': '微信号删除',
            '/account/weixin/excel': '微信号表格',

            '/account/qiehao/list': '企鹅号列表',
            '/account/qiehao/add': '企鹅号添加',
            '/account/qiehao/edit': '企鹅号编辑',
            '/account/qiehao/delete': '企鹅号删除',
            '/account/qiehao/excel': '企鹅号表格',

            '/account/zhihu/list': '知乎列表',
            '/account/zhihu/add': '知乎添加',
            '/account/zhihu/edit': '知乎编辑',
            '/account/zhihu/delete': '知乎删除',
            '/account/zhihu/excel': '知乎表格',
        }
       
        // 写入操作日志
        const method = ctx.method
        const url = ctx.url.split('?')[0]
        const account = ctx.account
        const userName = ctx.userName
        const title = urlMap[url]
        const params = method == 'POST' ? ctx.request.body : ctx.request.query
        if (title){
            ctx.app.model.SysLog.create({
                account: account,
                userName: userName,
                title: title,
                url: url,
                method: method,
                params: JSON.stringify(params)
            })
        }
        await next()
    }
}

