
module.exports = app => {
    return async (ctx, next) => {
        const apiParam = {// 请求接口 参数校验
            '/login': {// 登录接口
                account:{
                    type: 'string',
                    required: true,
                    desc: '账号'
                },
                password: {
                    type: 'string',
                    required:true,
                    desc: '密码'
                }
            },
            // =========== 用户 ===========
            '/system/user/list': {// 用户列表接口
                page:{
                  type:'number',
                  min: 1,
                  required: true,
                  desc: '页码'
                },
                size: {
                  type: 'number',
                  required: true,
                  desc: '页码数据量'
                },
                enable: {
                  type: 'number',
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
            },
            '/system/user/add': {// 用户新增接口
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
                  type: 'number',
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
                  type: 'number',
                  min: 0,
                  max: 1, 
                  required: true,
                  desc: '是否启用'
                },
                rid: {
                  type: 'number',
                  required: false,
                  desc: '角色id绑定'
                },
                desc: {
                  type: 'string',
                  required: false,
                  desc: '备注'
                }
            },
            '/system/user/edit': {// 用户修改接口
                uid: {
                  type: 'number',
                  required: true,
                  desc: '主键'
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
                  type: 'number',
                  min: 0,
                  max: 1, 
                  required: false,
                  desc: '是否启用'
                },
                rid: {
                  type: 'number',
                  required: false,
                  desc: '角色id绑定'
                },
                desc: {
                  type: 'string',
                  required: false,
                  desc: '备注'
                }
            },
            '/system/user/delete': {// 用户删除接口
                uid: {
                  type: 'number',
                  required: true,
                  desc: '主键'
                }
            },
            // =========== 角色 ===========
            '/system/role/list': {// 角色列表接口 角色/权限组
                type: {
                  type: 'enum',
                  values: ['role', 'perm'],
                  required: true
                },
                rid: {
                  type: 'number',
                  required: false,
                  desc: '主键'
                }
            },
            '/system/role/add': {// 角色新增接口
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
                  desc: '名称'
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
            },
            '/system/role/edit': {// 角色修改接口
                rid: {
                  type: 'number',
                  required: true,
                  desc: '主键'
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
            },
            '/system/role/delete': {// 角色删除接口
                rid: {
                  type: 'number',
                  required: true,
                  desc: '主键'
                }
            },
            // =========== 菜单/权限 ===========
            '/system/menu/add': {// 菜单新增接口
                pid: {
                  type: 'number',
                  required: true,
                  desc: '父级id'
                },
                type: {
                  type: 'number',
                  min: 0,
                  max: 2,
                  required: true,
                  desc: '0目录 1菜单 2按钮'
                },
                title: {
                  type: 'string',
                  required: true,
                  desc: '标题'
                },
                name: {
                  type: 'string',
                  required: false,
                  desc: '名称 用于组件'
                },
                component: {
                  type: 'string',
                  required: false,
                  desc: '组件名称, 前端组件路径'
                },
                icon: {
                  type: 'string',
                  required: false,
                  desc: '图标名称'
                },
                path: {
                  type: 'string',
                  required: false,
                  desc: '前端路由'
                },
                cache: {
                  type: 'number',
                  required: false,
                  desc: '前端页面是否缓存'
                },
                permission: {
                  type: 'string',
                  required: false,
                  desc: '权限标识'
                },
                sortId: {
                  type: 'number',
                  required: false,
                  desc: '排序'
                }
            },
            '/system/menu/edit': {// 菜单修改接口
                mid: {
                    type: 'number',
                    required: true,
                    desc: '主键'
                },
                pid: {
                  type: 'number',
                  required: false,
                  desc: '父级id'
                },
                type: {
                  type: 'number',
                  min: 0,
                  max: 2,
                  required: false,
                  desc: '0目录 1菜单 2按钮'
                },
                title: {
                  type: 'string',
                  required: false,
                  desc: '标题'
                },
                name: {
                  type: 'string',
                  required: false,
                  desc: '名称 用于组件'
                },
                component: {
                  type: 'string',
                  required: false,
                  desc: '组件名称, 前端组件路径'
                },
                icon: {
                  type: 'string',
                  required: false,
                  desc: '图标名称'
                },
                path: {
                  type: 'string',
                  required: false,
                  desc: '前端路由'
                },
                cache: {
                  type: 'number',
                  required: false,
                  desc: '前端页面是否缓存'
                },
                permission: {
                  type: 'string',
                  required: false,
                  desc: '权限标识'
                },
                sortId: {
                  type: 'number',
                  required: false,
                  desc: '排序'
                }
            },
            '/system/menu/delete': {// 菜单删除接口
                mid: {
                    type: 'number',
                    required: true,
                    desc: '主键'
                }
            }
            

        }
        
        // 校验
        if (apiParam[ctx.url]){
            const error = ctx.app.validator.validate(apiParam[ctx.url], ctx.method == 'POST' ? ctx.request.body : ctx.request.query)
            if (error){
                ctx.body = {
                    code: 400,
                    errMsg: error
                }
                return
            } 
        }

        await next()
    }
}

