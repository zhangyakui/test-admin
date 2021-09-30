module.exports = app => {
    return async (ctx, next) => {
        // 操作模块映射
        const urlMap = {
            '/api/permission': '登录',
            // 系统设置
            '/api/system/user/list': '用户列表',
            '/api/system/user/excel': '用户表格',
            '/api/system/user/add': '用户添加',
            '/api/system/user/edit': '用户编辑',
            '/api/system/user/delete': '用户删除',

            '/api/system/role/list': '角色列表',
            '/api/system/role/add': '角色添加',
            '/api/system/role/edit': '角色编辑',
            '/api/system/role/delete': '角色删除',

            '/api/system/menu/list': '菜单列表',
            '/api/system/menu/add': '菜单添加',
            '/api/system/menu/edit': '菜单编辑',
            '/api/system/menu/delete': '菜单删除',

            '/api/system/log/list': '日志列表',
            '/api/system/log/excel': '日志表格',
            '/api/system/log/delete': '日志清空',

            // 资产管理
            '/api/assets/phone/list': '手机列表',
            '/api/assets/phone/add': '手机添加',
            '/api/assets/phone/edit': '手机编辑',
            '/api/assets/phone/delete': '手机删除',
            '/api/assets/phone/excel': '手机表格',

            '/api/assets/computer/list': '电脑列表',
            '/api/assets/computer/add': '电脑添加',
            '/api/assets/computer/edit': '电脑编辑',
            '/api/assets/computer/delete': '电脑删除',
            '/api/assets/computer/excel': '电脑表格',

            '/api/assets/other/list': '其他列表',
            '/api/assets/other/add': '其他添加',
            '/api/assets/other/edit': '其他编辑',
            '/api/assets/other/delete': '其他删除',
            '/api/assets/other/excel': '其他表格',

            // 平台账号
            '/api/account/phone/list': '手机号列表',
            '/api/account/phone/add': '手机号添加',
            '/api/account/phone/edit': '手机号编辑',
            '/api/account/phone/delete': '手机号删除',
            '/api/account/phone/excel': '手机号表格',

            '/api/account/qq/list': 'QQ号列表',
            '/api/account/qq/add': 'QQ号添加',
            '/api/account/qq/edit': 'QQ号编辑',
            '/api/account/qq/delete': 'QQ号删除',
            '/api/account/qq/excel': 'QQ号表格',

            '/api/account/weixin/list': '微信号列表',
            '/api/account/weixin/add': '微信号添加',
            '/api/account/weixin/edit': '微信号编辑',
            '/api/account/weixin/delete': '微信号删除',
            '/api/account/weixin/excel': '微信号表格',

            '/api/account/qiehao/list': '企鹅号列表',
            '/api/account/qiehao/add': '企鹅号添加',
            '/api/account/qiehao/edit': '企鹅号编辑',
            '/api/account/qiehao/delete': '企鹅号删除',
            '/api/account/qiehao/excel': '企鹅号表格',

            '/api/account/zhihu/list': '知乎列表',
            '/api/account/zhihu/add': '知乎添加',
            '/api/account/zhihu/edit': '知乎编辑',
            '/api/account/zhihu/delete': '知乎删除',
            '/api/account/zhihu/excel': '知乎表格',

            // 邮箱管理
            '/api/email/ali/list': '阿里邮箱列表',
            '/api/email/ali/add': '阿里邮箱添加',
            '/api/email/ali/edit': '阿里邮箱编辑',
            '/api/email/ali/delete': '阿里邮箱删除',
            '/api/email/ali/excel': '阿里邮箱表格',
            '/api/email/ali/email': '阿里邮箱拉取',

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

