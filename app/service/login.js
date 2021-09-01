module.exports = app => {
    class LoginService extends app.Service {
        async index(body){
            const {account, password} = body
            const user = await this.app.model.SysUser.findOne({// 查询账号信息
                where: {
                    account: account,
                    enable: 1,
                },
                attributes: ['uid', 'username', 'account', 'password', 'gender', 'phone', 'avatarPath', 'isAdmin', 'enable', 'desc']
            })

            if (!user) return {code: 404, msg: '用户或密码不正确'}// 账号错误

            const flag = this.ctx.helper.decrypt(password, user.password)// 解密
            if (!flag) return {code: 404, msg: '用户或密码不正确'}// 密码错误

            const token = this.app.jwt.sign({
                account: account
            }, this.app.config.jwt.secret, {expiresIn: this.app.config.jwt.expiresIn})// 生成token

            let deptData = {}
            let roleData = {}// 一对一
            let menuData = []
            if (user.isAdmin == 1){// 超级管理员
                menuData = await this.app.model.SysMenu.findAll()
            }else{// 普通管理员
                // 查询 用户角色关系映射
                const ur = await this.app.model.SysUserRole.findOne({
                    where: {
                        uid: 2
                    }
                })

                // 查询角色信息
                if (ur){// 有角色绑定信息, 继续查寻角色信息
                    const role = await this.app.model.SysRole.findByPk(ur.rid)
                    if (role){
                        roleData = role

                        // 查询部门
                        deptData = await this.app.model.SysRole.findOne({
                            where: {
                                rid: role.pid
                            }
                        })

                        // 查询权限信息
                        const rm = await this.app.model.SysRoleMenu.findAll({
                            where: {
                                rid: role.rid
                            }
                        })
                        if (rm.length != 0){
                            let _midList = []
                            rm.forEach(item => {
                                _midList.push(item.mid)
                            })
                            menuData = await this.app.model.SysMenu.findAll({
                                where: {
                                    mid: {
                                        [this.app.Sequelize.Op.or]: _midList
                                    }
                                }
                            })
                        }
                    }
                }
            }

            // 查询权限信息
            // 分类 类型 目录/菜单/按钮
            let _list = []
            let _menus = []
            let _buttons = []
            menuData.forEach(item => {
                if (item.type == 0){// 目录
                _list.push(item)
                }else if (item.type == 1){// 菜单
                _menus.push(item)
                }else if (item.type == 2){// 按钮
                _buttons.push(item)
                }
            })

            // 排序
            _list.sort((a, b) => {
                return a.sortId - b.sortId
            })
            _menus.sort((a, b) => {
                return a.sortId - b.sortId
            })
            _buttons.sort((a, b) => {
                return a.sortId - b.sortId
            })

            // 解析 菜单列表 和 权限列表
            let menus = []
            let perms = []
            for (let i=0; i<_list.length; i++){// 遍历 目录
                let menuObj = {
                path: _list[i].path,
                name: _list[i].name,
                meta: {title: _list[i].title, icon: _list[i].icon},
                children: []
                }
                let listMid = _list[i].mid

                for (let j=0; j<_menus.length; j++){// 遍历 菜单
                    if (listMid == _menus[j].pid){// 菜单pid = 目录mid 
                        let subObj = {
                        path: _menus[j].path,
                        name: _menus[j].name,
                        meta: {title: _menus[j].title, icon: _menus[j].icon, cache: _menus[j].cache == 0 ? false : true},
                        component: _menus[j].component,
                        // operations: [],
                        }

                        let menuMid = _menus[j].mid 

                        perms.push(_menus[j].permission)
                        
                        for (let k=0; k<_buttons.length; k++){// 遍历按钮
                            if (menuMid == _buttons[k].pid){
                                // subObj.operations.push({
                                //   title: _buttons[k].title,
                                //   permission: _buttons[k].permission
                                // })
                                perms.push(_buttons[k].permission)
                            }
                        }
                        menuObj.children.push(subObj)
                    }
                }
                menus.push(menuObj)
            }

            // 保存当前账号权限列表, 作为权限请求查询
            app.config.userPermission[account] = {menus: menus, perms: perms}

            return {
                code: 200,
                msg: '登录成功',
                data: {
                    user: {
                        uid: user.uid,
                        username: user.username,
                        account: user.account,
                        isAdmin: user.isAdmin == 1 ? true: false,
                        gender: user.gender,
                        phone: user.phone,
                        avatarPath: user.avatarPath
                    },
                    dept: {
                        name: deptData.name,
                        desc: deptData.desc,
                    },
                    role: {
                        name: roleData.name,
                        desc: roleData.desc,
                    },
                    token: token
                }
            }
        }
    }
    return LoginService
}       
