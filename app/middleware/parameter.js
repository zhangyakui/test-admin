
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
                type: 'string',
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
              userName: {
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
              title: {
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
              title: {
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
          },
          // =========== 日志 ===========
          '/system/log/list': {
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
            keyword: {
              type: 'string',
              required: false,
              desc: '搜索关键词'
            }
          },
          // =========== 手机 ===========
          '/assets/phone/list': {
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
            type: {
              type: 'string',
              required: false,
              desc: '系统类型'
            },
            status: {
              type: 'string',
              required: false,
              desc: '状态'
            },
            keyword: {
              type: 'string',
              required: false,
              desc: '搜索关键词'
            }
          },
          '/assets/phone/add': {
            type: {
              type: 'string',
              required: true,
              desc: '系统类型 0苹果 1安卓'
            },
            phoneId: {
              type: 'string',
              required: true,
              desc: '编号'
            },
            name: {
              type: 'string',
              required: false,
              desc: '名称'
            },
            brand: {
              type: 'string',
              required: true,
              desc: '品牌'
            },
            model: {
              type: 'string',
              required: false,
              desc: '型号'
            },
            sysVer: {
              type: 'string',
              required: false,
              desc: '系统版本'
            },
            memory: {
              type: 'string',
              required: false,
              desc: '内存大小'
            },
            disk: {
              type: 'string',
              required: false,
              desc: '硬盘大小'
            },
            devNum: {
              type: 'string',
              required: true,
              desc: '标识'
            },
            status: {
              type: 'number',
              required: false,
              desc: '状态'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/assets/phone/edit': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            },
            phoneId: {
              type: 'string',
              required: true,
              desc: '编号'
            },
            name: {
              type: 'string',
              required: false,
              desc: '名称'
            },
            sysVer: {
              type: 'string',
              required: false,
              desc: '系统版本'
            },
            status: {
              type: 'number',
              required: false,
              desc: '状态'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/assets/phone/delete': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            }
          },
          // =========== 手机号 ===========
          '/account/phone/list': {
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
            status: {
              type: 'string',
              required: false,
              desc: '状态'
            },
            keyword: {
              type: 'string',
              required: false,
              desc: '搜索关键词'
            }
          },
          '/account/phone/add': {
            agent: {
              type: 'string',
              required: true,
              desc: '代理商'
            },
            operator: {
              type: 'number',
              required: true,
              desc: '运营商'
            },
            cardName: {
              type: 'string',
              required: true,
              desc: '编号'
            },
            number: {
              type: 'string',
              required: true,
              desc: '号码'
            },
            iccid: {
              type: 'string',
              required: false,
              desc: 'ICCID'
            },
            puk: {
              type: 'string',
              required: false,
              desc: 'PUK'
            },
            local: {
              type: 'string',
              required: false,
              desc: '归属地'
            },
            realInfo: {
              type: 'string',
              required: false,
              desc: '实名信息'
            },
            status: {
              type: 'number',
              required: true,
              desc: '状态'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/phone/edit': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            },
            agent: {
              type: 'string',
              required: false,
              desc: '代理商'
            },
            operator: {
              type: 'number',
              required: false,
              desc: '运营商'
            },
            cardName: {
              type: 'string',
              required: false,
              desc: '编号'
            },
            number: {
              type: 'string',
              required: false,
              desc: '号码'
            },
            iccid: {
              type: 'string',
              required: false,
              desc: 'ICCID'
            },
            puk: {
              type: 'string',
              required: false,
              desc: 'PUK'
            },
            local: {
              type: 'string',
              required: false,
              desc: '归属地'
            },
            realInfo: {
              type: 'string',
              required: false,
              desc: '实名信息'
            },
            status: {
              type: 'number',
              required: false,
              desc: '状态'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/phone/delete': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            }
          },
          // =========== QQ号 ===========
          '/account/qq/list': {
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
            status: {
              type: 'string',
              required: false,
              desc: '状态'
            },
            keyword: {
              type: 'string',
              required: false,
              desc: '搜索关键词'
            }
          },
          '/account/qq/add': {
            avatarUrl: {
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
            level: {
              type: 'string',
              required: false,
              desc: '等级'
            },
            phone: {
              type: 'string',
              required: false,
              desc: '手机号'
            },
            abnormal: {
              type: 'string',
              required: false,
              desc: '异常信息'
            },
            status: {
              type: 'string',
              required: true,
              desc: '状态'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/qq/edit': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            },
            avatarUrl: {
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
              required: false,
              desc: '账号'
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
            level: {
              type: 'string',
              required: false,
              desc: '等级'
            },
            abnormal: {
              type: 'string',
              required: false,
              desc: '异常信息'
            },
            status: {
              type: 'string',
              required: false,
              desc: '使用状态'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/qq/delete': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            }
          },
          // =========== 微信号 ===========
          '/account/weixin/list': {
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
            status: {
              type: 'string',
              required: false,
              desc: '状态'
            },
            keyword: {
              type: 'string',
              required: false,
              desc: '搜索关键词'
            }
          },
          '/account/weixin/add': {
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
              required: false,
              desc: '微信号'
            },
            phone: {
              type: 'string',
              required: false,
              desc: '手机号'
            },
            abnormal: {
              type: 'string',
              required: false,
              desc: '异常信息'
            },
            status: {
              type: 'string',
              required: true,
              desc: '状态'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/weixin/edit': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            },
            nickName: {
              type: 'string',
              required: false,
              desc: '昵称'
            },
            account: {
              type: 'string',
              required: false,
              desc: '账号'
            },
            password: {
              type: 'string',
              required: false,
              desc: '密码'
            },
            uid: {
              type: 'string',
              required: false,
              desc: '微信号'
            },
            phone: {
              type: 'string',
              required: false,
              desc: '手机号'
            },
            abnormal: {
              type: 'string',
              required: false,
              desc: '异常信息'
            },
            status: {
              type: 'string',
              required: false,
              desc: '使用状态'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/weixin/delete': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            }
          },
          // =========== 企鹅号 ===========
          '/account/qiehao/list': {
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
            category: {
              type: 'string',
              required: false,
              desc: '分类'
            },
            status: {
              type: 'string',
              required: false,
              desc: '状态'
            },
            keyword: {
              type: 'string',
              required: false,
              desc: '搜索关键词'
            }
          },
          '/account/qiehao/add': {
            category: {
              type: 'string',
              required: true,
              desc: '分类'
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
            phone: {
              type: 'string',
              required: false,
              desc: '手机号'
            },
            abnormal: {
              type: 'string',
              required: false,
              desc: '异常信息'
            },
            status: {
              type: 'string',
              required: true,
              desc: '状态'
            },
            cookies: {
              type: 'string',
              required: false,
              desc: 'Cookies  JSON字符串'
            },
            userInfo: {
              type: 'string',
              required: false,
              desc: '用户信息 JSON字符串'
            },
            worksInfo: {
              type: 'string',
              required: false,
              desc: '作品信息 JSON字符串'
            },
            platform: {
              type: 'string',
              required: false,
              desc: '镜像平台名称'
            },
            homeLink: {
              type: 'string',
              required: false,
              desc: '镜像主页链接'
            },
            startTime: {
              type: 'string',
              required: false,
              desc: '监控起始日期'
            },
            endTime: {
              type: 'string',
              required: false,
              desc: '监控截止日期'
            },
            homeInfo: {
              type: 'string',
              required: false,
              desc: '镜像主页信息'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/qiehao/edit': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            },
            category: {
              type: 'string',
              required: false,
              desc: '分类'
            },
            nickName: {
              type: 'string',
              required: false,
              desc: '昵称'
            },
            account: {
              type: 'string',
              required: false,
              desc: '账号'
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
            abnormal: {
              type: 'string',
              required: false,
              desc: '异常信息'
            },
            status: {
              type: 'string',
              required: false,
              desc: '状态'
            },
            cookies: {
              type: 'string',
              required: false,
              desc: 'Cookies  JSON字符串'
            },
            userInfo: {
              type: 'string',
              required: false,
              desc: '用户信息 JSON字符串'
            },
            worksInfo: {
              type: 'string',
              required: false,
              desc: '作品信息 JSON字符串'
            },
            platform: {
              type: 'string',
              required: false,
              desc: '镜像平台名称'
            },
            homeLink: {
              type: 'string',
              required: false,
              desc: '镜像主页链接'
            },
            startTime: {
              type: 'string',
              required: false,
              desc: '监控起始日期'
            },
            endTime: {
              type: 'string',
              required: false,
              desc: '监控截止日期'
            },
            homeInfo: {
              type: 'string',
              required: false,
              desc: '镜像主页信息'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/qiehao/delete': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            }
          },
          // =========== 知乎 ===========
          '/account/zhihu/list': {
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
            category: {
              type: 'string',
              required: false,
              desc: '分类'
            },
            status: {
              type: 'string',
              required: false,
              desc: '状态'
            },
            keyword: {
              type: 'string',
              required: false,
              desc: '搜索关键词'
            }
          },
          '/account/zhihu/add': {
            category: {
              type: 'string',
              required: true,
              desc: '分类'
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
            phone: {
              type: 'string',
              required: false,
              desc: '手机号'
            },
            abnormal: {
              type: 'string',
              required: false,
              desc: '异常信息'
            },
            status: {
              type: 'string',
              required: true,
              desc: '状态'
            },
            cookies: {
              type: 'string',
              required: false,
              desc: 'Cookies  JSON字符串'
            },
            userInfo: {
              type: 'string',
              required: false,
              desc: '用户信息 JSON字符串'
            },
            worksInfo: {
              type: 'string',
              required: false,
              desc: '作品信息 JSON字符串'
            },
            platform: {
              type: 'string',
              required: false,
              desc: '镜像平台名称'
            },
            homeLink: {
              type: 'string',
              required: false,
              desc: '镜像主页链接'
            },
            startTime: {
              type: 'string',
              required: false,
              desc: '监控起始日期'
            },
            endTime: {
              type: 'string',
              required: false,
              desc: '监控截止日期'
            },
            homeInfo: {
              type: 'string',
              required: false,
              desc: '镜像主页信息'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/zhihu/edit': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            },
            category: {
              type: 'string',
              required: false,
              desc: '分类'
            },
            nickName: {
              type: 'string',
              required: false,
              desc: '昵称'
            },
            account: {
              type: 'string',
              required: false,
              desc: '账号'
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
            abnormal: {
              type: 'string',
              required: false,
              desc: '异常信息'
            },
            status: {
              type: 'string',
              required: false,
              desc: '状态'
            },
            cookies: {
              type: 'string',
              required: false,
              desc: 'Cookies  JSON字符串'
            },
            userInfo: {
              type: 'string',
              required: false,
              desc: '用户信息 JSON字符串'
            },
            worksInfo: {
              type: 'string',
              required: false,
              desc: '作品信息 JSON字符串'
            },
            platform: {
              type: 'string',
              required: false,
              desc: '镜像平台名称'
            },
            homeLink: {
              type: 'string',
              required: false,
              desc: '镜像主页链接'
            },
            startTime: {
              type: 'string',
              required: false,
              desc: '监控起始日期'
            },
            endTime: {
              type: 'string',
              required: false,
              desc: '监控截止日期'
            },
            homeInfo: {
              type: 'string',
              required: false,
              desc: '镜像主页信息'
            },
            desc: {
              type: 'string',
              required: false,
              desc: '描述'
            }
          },
          '/account/zhihu/delete': {
            id: {
              type: 'number',
              required: true,
              desc: '主键'
            }
          },
          

        }

        // 校验
        const url = ctx.url.split('?')[0]
        if (apiParam[url]){
            const error = ctx.app.validator.validate(apiParam[url], ctx.method == 'POST' ? ctx.request.body : ctx.request.query)
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

