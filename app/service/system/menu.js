module.exports = app => {
  class MenuService extends app.Service {
    // 列表
    async list(){
      const menuData = await this.app.model.SysMenu.findAll()
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
      for (let i=0; i<_list.length; i++){// 遍历 目录
          let menuObj = {
            mid: _list[i].mid,
            type: _list[i].type,
            title: _list[i].title,
            name: _list[i].name,
            component: _list[i].component,
            icon: _list[i].icon,
            path: _list[i].path,
            cache: _list[i].cache,
            permission: _list[i].permission,
            sortId: _list[i].sortId,
            children: []
          }
          let listMid = _list[i].mid

          for (let j=0; j<_menus.length; j++){// 遍历 菜单
            if (listMid == _menus[j].pid){// 菜单pid = 目录mid 
              let subObj = {
                mid: _menus[j].mid,
                type: _menus[j].type,
                title: _menus[j].title,
                name: _menus[j].name,
                component: _menus[j].component,
                icon: _menus[j].icon,
                path: _menus[j].path,
                cache: _menus[j].cache == 0 ? false : true,
                permission: _menus[j].permission,
                sortId: _menus[j].sortId,
                children: []
              }

              let menuMid = _menus[j].mid 
              
              for (let k=0; k<_buttons.length; k++){// 遍历按钮
                  if (menuMid == _buttons[k].pid){
                      subObj.children.push({
                        mid: _buttons[k].mid,
                        type: _buttons[k].type,
                        title: _buttons[k].title,
                        name: _buttons[k].name,
                        component: _buttons[k].component,
                        icon: _buttons[k].icon,
                        path: _buttons[k].path,
                        cache: _buttons[k].cache,
                        permission: _buttons[k].permission,
                        sortId: _buttons[k].sortId
                      })
                  }
              }
              menuObj.children.push(subObj)
            }
          }
          menus.push(menuObj)
      }
      return {
        code: 200,
        data: menus
      }
    }

    // 新增
    async add(body){
      const {pid, type} = body

      // 查询 pid(0不做判断) 是否存在
      if (type != 0){// 非目录需要查询是否存在数据
        const menu = await this.app.model.SysMenu.findByPk(pid)
        if (!menu){
          return {
            code: 404,
            msg: '新增失败， 当前父节点数据不存在'
          }
        }
      }

      try{
        await this.app.model.SysMenu.create(body)
      }catch{
        return {
          code: 201,
          msg: '新增失败, 菜单已存在'
        }
      }

      return {
        code: 200,
        msg: '新增成功'
      }
    }

    // 修改
    async edit(body){
      const {mid, pid, type} = body

      // 查询数据是否存在
      const menu = await this.app.model.SysMenu.findByPk(mid)
      if (!menu) {
        return {
          code: 404,
          msg: '修改失败, 菜单不存在'
        }
      }

      // 查询 pid(0不做判断) 是否存在
      if (type != 0){// 非目录需要查询是否存在数据
        const menu2 = await this.app.model.SysMenu.findByPk(pid)
        if (!menu2){
          return {
            code: 404,
            msg: '修改失败, 当前父节点数据不存在'
          }
        }
      }

      // 修改
      try{
        await menu.update(body)
      }catch{
        return {
          code: 201,
          msg: '修改失败, 字段重复'
        }
      }

      return {
        code: 200,
        msg: '修改成功'
      }
    }

    // 删除
    async delete(body){
      const {mid} = body
      // 查询是否存在
      const menu = await this.app.model.SysMenu.findByPk(mid)
      if (!menu){
        return {
          code: 404,
          msg: '删除失败, 菜单不存在'
        }
      }

      // 删除角色菜单映射
      const rm = await this.app.model.SysRoleMenu.findAll({
        where: {
          mid: mid
        }
      })

      rm.forEach(async data => {
        await data.destroy()
      })

      await menu.destroy()
      
      return {
        code: 200,
        msg: '删除成功'
      }
    }
  }
  return MenuService
}
