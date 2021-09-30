'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 登录 
  router.post('/api/login', controller.login.index);

  // 获取 菜单列表和权限列表
  router.get('/api/permission', controller.permission.index);

  // |-------------------- 系统管理 --------------------|
  // 用户管理
  router.get('/api/system/user/list', controller.system.user.list);
  router.get('/api/system/user/excel', controller.system.user.excel);
  router.post('/api/system/user/add', controller.system.user.add);
  router.post('/api/system/user/edit', controller.system.user.edit);
  router.post('/api/system/user/delete', controller.system.user.delete);

  // 角色管理
  router.get('/api/system/role/list', controller.system.role.list);
  router.post('/api/system/role/add', controller.system.role.add);
  router.post('/api/system/role/edit', controller.system.role.edit);
  router.post('/api/system/role/delete', controller.system.role.delete);

  // 权限管理
  router.get('/api/system/menu/list', controller.system.menu.list);
  router.post('/api/system/menu/add', controller.system.menu.add);
  router.post('/api/system/menu/edit', controller.system.menu.edit);
  router.post('/api/system/menu/delete', controller.system.menu.delete);

  // 操作日志
  router.get('/api/system/log/list', controller.system.log.list);
  router.get('/api/system/log/excel', controller.system.log.excel);
  router.post('/api/system/log/delete', controller.system.log.delete);

  // |-------------------- 审核管理 --------------------|
  router.get('/api/approve/reimburse/list', controller.approve.reimburse.list);


  // |-------------------- 资产管理 --------------------|
  // 手机
  router.get('/api/assets/phone/list', controller.assets.phone.list);
  router.get('/api/assets/phone/excel', controller.assets.phone.excel);
  router.post('/api/assets/phone/add', controller.assets.phone.add);
  router.post('/api/assets/phone/edit', controller.assets.phone.edit);
  router.post('/api/assets/phone/delete', controller.assets.phone.delete);

  // 电脑
  router.get('/api/assets/computer/list', controller.assets.computer.list);
  router.get('/api/assets/computer/excel', controller.assets.computer.excel);
  router.post('/api/assets/computer/add', controller.assets.computer.add);
  router.post('/api/assets/computer/edit', controller.assets.computer.edit);
  router.post('/api/assets/computer/delete', controller.assets.computer.delete);

  // 其他
  router.get('/api/assets/other/list', controller.assets.other.list);
  router.get('/api/assets/other/excel', controller.assets.other.excel);
  router.post('/api/assets/other/add', controller.assets.other.add);
  router.post('/api/assets/other/edit', controller.assets.other.edit);
  router.post('/api/assets/other/delete', controller.assets.other.delete);

  // |-------------------- 平台账号 --------------------|
  // 手机号
  router.get('/api/account/phone/list', controller.account.phone.list);
  router.get('/api/account/phone/excel', controller.account.phone.excel);
  router.post('/api/account/phone/add', controller.account.phone.add);
  router.post('/api/account/phone/edit', controller.account.phone.edit);
  router.post('/api/account/phone/delete', controller.account.phone.delete);

  // QQ号
  router.get('/api/account/qq/list', controller.account.qq.list);
  router.get('/api/account/qq/excel', controller.account.qq.excel);
  router.post('/api/account/qq/add', controller.account.qq.add);
  router.post('/api/account/qq/edit', controller.account.qq.edit);
  router.post('/api/account/qq/delete', controller.account.qq.delete);

  // 微信号
  router.get('/api/account/weixin/list', controller.account.weixin.list);
  router.get('/api/account/weixin/excel', controller.account.weixin.excel);
  router.post('/api/account/weixin/add', controller.account.weixin.add);
  router.post('/api/account/weixin/edit', controller.account.weixin.edit);
  router.post('/api/account/weixin/delete', controller.account.weixin.delete);

  // 企鹅号
  router.get('/api/account/qiehao/list', controller.account.qiehao.list);
  router.get('/api/account/qiehao/excel', controller.account.qiehao.excel);
  router.post('/api/account/qiehao/add', controller.account.qiehao.add);
  router.post('/api/account/qiehao/edit', controller.account.qiehao.edit);
  router.post('/api/account/qiehao/delete', controller.account.qiehao.delete);

  // 知乎
  router.get('/api/account/zhihu/list', controller.account.zhihu.list);
  router.get('/api/account/zhihu/excel', controller.account.zhihu.excel);
  router.post('/api/account/zhihu/add', controller.account.zhihu.add);
  router.post('/api/account/zhihu/edit', controller.account.zhihu.edit);
  router.post('/api/account/zhihu/delete', controller.account.zhihu.delete);

  // |-------------------- 邮箱管理 --------------------|
  // 阿里邮箱
  router.get('/api/email/ali/list', controller.email.ali.list);
  router.get('/api/email/ali/excel', controller.email.ali.excel);
  router.post('/api/email/ali/add', controller.email.ali.add);
  router.post('/api/email/ali/edit', controller.email.ali.edit);
  router.post('/api/email/ali/delete', controller.email.ali.delete);
  router.post('/api/email/ali/email', controller.email.ali.email);






















};
