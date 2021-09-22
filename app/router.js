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
  // 用户管理
  router.get('/system/user/list', controller.system.user.list);
  router.get('/system/user/excel', controller.system.user.excel);
  router.post('/system/user/add', controller.system.user.add);
  router.post('/system/user/edit', controller.system.user.edit);
  router.post('/system/user/delete', controller.system.user.delete);

  // 角色管理
  router.get('/system/role/list', controller.system.role.list);
  router.post('/system/role/add', controller.system.role.add);
  router.post('/system/role/edit', controller.system.role.edit);
  router.post('/system/role/delete', controller.system.role.delete);

  // 权限管理
  router.get('/system/menu/list', controller.system.menu.list);
  router.post('/system/menu/add', controller.system.menu.add);
  router.post('/system/menu/edit', controller.system.menu.edit);
  router.post('/system/menu/delete', controller.system.menu.delete);

  // 操作日志
  router.get('/system/log/list', controller.system.log.list);
  router.get('/system/log/excel', controller.system.log.excel);
  router.post('/system/log/delete', controller.system.log.delete);

  // |-------------------- 资产管理 --------------------|
  // 手机
  router.get('/assets/phone/list', controller.assets.phone.list);
  router.get('/assets/phone/excel', controller.assets.phone.excel);
  router.post('/assets/phone/add', controller.assets.phone.add);
  router.post('/assets/phone/edit', controller.assets.phone.edit);
  router.post('/assets/phone/delete', controller.assets.phone.delete);

  // |-------------------- 平台账号 --------------------|
  // 手机号
  router.get('/account/phone/list', controller.account.phone.list);
  router.get('/account/phone/excel', controller.account.phone.excel);
  router.post('/account/phone/add', controller.account.phone.add);
  router.post('/account/phone/edit', controller.account.phone.edit);
  router.post('/account/phone/delete', controller.account.phone.delete);

  // QQ号
  router.get('/account/qq/list', controller.account.qq.list);
  router.get('/account/qq/excel', controller.account.qq.excel);
  router.post('/account/qq/add', controller.account.qq.add);
  router.post('/account/qq/edit', controller.account.qq.edit);
  router.post('/account/qq/delete', controller.account.qq.delete);

  // 微信号
  router.get('/account/weixin/list', controller.account.weixin.list);
  router.get('/account/weixin/excel', controller.account.weixin.excel);
  router.post('/account/weixin/add', controller.account.weixin.add);
  router.post('/account/weixin/edit', controller.account.weixin.edit);
  router.post('/account/weixin/delete', controller.account.weixin.delete);

  // 企鹅号
  router.get('/account/qiehao/list', controller.account.qiehao.list);
  router.get('/account/qiehao/excel', controller.account.qiehao.excel);
  router.post('/account/qiehao/add', controller.account.qiehao.add);
  router.post('/account/qiehao/edit', controller.account.qiehao.edit);
  router.post('/account/qiehao/delete', controller.account.qiehao.delete);

  // 知乎
  router.get('/account/zhihu/list', controller.account.zhihu.list);
  router.get('/account/zhihu/excel', controller.account.zhihu.excel);
  router.post('/account/zhihu/add', controller.account.zhihu.add);
  router.post('/account/zhihu/edit', controller.account.zhihu.edit);
  router.post('/account/zhihu/delete', controller.account.zhihu.delete);

};
