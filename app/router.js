'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /**
   *
   * list 包含 筛选 查询功能 
   * 
   * 
   * 
   */ 
  // 登录 
  router.post('/login', controller.login.index);

  // 获取 菜单列表和权限列表
  router.get('/permission', controller.permission.index);


  // |-----系统管理-----|
  // 用户管理

  // 角色管理
  router.get('/system/role/list', controller.system.role.list);
  router.post('/system/role/add', controller.system.role.add);


  // 权限管理



  // 微信账号
  // router.get('/weixin/account/filter', controller.account.wexin.filter);
  // router.get('/weixin/account/list', controller.account.wexin.list);
  // router.get('/weixin/account/search', controller.account.wexin.search);
  // router.post('/weixin/account/create', controller.account.wexin.create);
  // router.post('/weixin/account/update', controller.account.wexin.update);
  // router.post('/weixin/account/destroy', controller.account.wexin.destroy);

  
};
