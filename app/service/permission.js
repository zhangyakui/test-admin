const menu = require("../controller/system/menu")

module.exports = app => {
  class PermissionService extends app.Service {
    // 获取 菜单/权限 信息 
    async index(account){
     return {
       code: 200,
       data: app.config.userPermission[account]
     }
    }
  }
  return PermissionService
}
