'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 登录 
  router.post('/login', controller.login.index);

  // 获取 菜单列表和权限列表
  router.get('/permission', controller.permission.index);

  // |-------------------- 系统管理 --------------------|
  // 用户管理 完善
  router.get('/system/user/list', controller.system.user.list);
  router.post('/system/user/add', controller.system.user.add);
  router.post('/system/user/edit', controller.system.user.edit);
  router.post('/system/user/delete', controller.system.user.delete);

  // 角色管理 完善
  router.get('/system/role/list', controller.system.role.list);
  router.post('/system/role/add', controller.system.role.add);
  router.post('/system/role/edit', controller.system.role.edit);
  router.post('/system/role/delete', controller.system.role.delete);

  // 权限管理
  router.get('/system/menu/list', controller.system.menu.list);
  router.post('/system/menu/add', controller.system.menu.add);
  router.post('/system/menu/edit', controller.system.menu.edit);
  router.post('/system/menu/delete', controller.system.menu.delete);



  // 微信账号
  // router.get('/weixin/account/filter', controller.account.wexin.filter);
  // router.get('/weixin/account/list', controller.account.wexin.list);
  // router.get('/weixin/account/search', controller.account.wexin.search);
  // router.post('/weixin/account/create', controller.account.wexin.create);
  // router.post('/weixin/account/update', controller.account.wexin.update);
  // router.post('/weixin/account/destroy', controller.account.wexin.destroy);

  
};
