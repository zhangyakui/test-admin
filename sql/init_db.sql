-- 创建数据库
CREATE DATABASE IF NOT EXISTS `zyk-admin`;
USE `zyk-admin`;

-- 用户表
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `uid` INT(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` VARCHAR(255) NOT NULL COMMENT '姓名',
  `account` VARCHAR(255) NOT NULL COMMENT '账号, 一般采用邮箱作为登录',
  `password` VARCHAR(255) NOT NULL COMMENT '密码',
  `gender` TINYINT(4) NOT NULL COMMENT '性别 1男 2女',
  `phone` VARCHAR(255) DEFAULT NULL COMMENT '手机号',
  `is_admin` TINYINT(4) NOT NULL COMMENT '是否是超级管理员 0超级管理员 1普通管理员',
  `enable` TINYINT(4) NOT NULL COMMENT '是否启用 0禁用 1启用',
  `desc` VARCHAR(255) DEFAULT NULL COMMENT '备注',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日期',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `account` (`account`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

INSERT INTO `sys_user`(`username`,`account`,`password`,`gender`,`is_admin`,`enable`,`desc`) VALUES 
('楠楠传媒','nannan','$2a$10$QjkL0taIZCaRsiT26KK5aujQhakzSqOefbKw9kJq8RR5WPWSwJySW',0,0,1,'拥有最高权限, 不需要映射角色菜单表'); -- bcrypt 密码 在线加密: http://www.ab126.com/goju/10822.html (默认10位)

-- 用户角色映射表
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `urid` INT(11) NOT NULL AUTO_INCREMENT COMMENT '用户角色id',
  `uid` INT(11) DEFAULT NULL COMMENT '用户id',
  `rid` INT(11) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`urid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关系表';

-- 角色表
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `rid` INT(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `pid` INT(11) NOT NULL COMMENT '父级id',
  `type` TINYINT(4) NOT NULL COMMENT '类型 0部门 1职位',
  `name` VARCHAR(255) NOT NULL COMMENT '名称 部门/职位',
  `desc` VARCHAR(255) DEFAULT NULL COMMENT '备注',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日期',
  PRIMARY KEY (`rid`),
  UNIQUE KEY `name` (`name`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- 角色菜单映射表
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `rmid` INT(11) NOT NULL AUTO_INCREMENT COMMENT '角色菜单id',
  `rid` INT(11) NOT NULL COMMENT '角色id',
  `mid` INT(11) NOT NULL COMMENT '菜单id',
  PRIMARY KEY (`rmid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COMMENT='角色菜单关系表';

-- 菜单表
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `mid` INT(11) NOT NULL AUTO_INCREMENT COMMENT '菜单id',
  `pid` INT(11) NOT NULL COMMENT '父级id',
  `type` TINYINT(4) NOT NULL COMMENT '菜单类型 0目录 1菜单 2按钮',
  `title` VARCHAR(255) NOT NULL COMMENT '菜单标题',
  `path` VARCHAR(255) DEFAULT NULL COMMENT '路由',
  `cache` TINYINT(4) DEFAULT NULL COMMENT '是否缓存 0否 1是',
  `permission` VARCHAR(255) DEFAULT NULL COMMENT '权限标识',
  `sort_id` INT(11) DEFAULT NULL COMMENT '排序',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日期',
  PRIMARY KEY (`mid`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `path` (`path`),
  UNIQUE KEY `permission` (`permission`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

INSERT  INTO `sys_menu`(`mid`,`pid`,`type`,`title`,`path`,`cache`,`permission`,`sort_id`) VALUES 
(1, 0, 0, '系统管理', '/system', NULL, NULL, 1),
(2, 1, 1, '用户管理', '/system/user', 1, 'system:user:list', 1),
(3, 2, 2, '用户新增', NULL, NULL, 'system:user:add', 1),
(4, 2, 2, '用户编辑', NULL, NULL, 'system:user:edit', 2),
(5, 2, 2, '用户删除', NULL, NULL, 'system:user:delete', 3),
(6, 2, 2, '用户表格', NULL, NULL, 'system:user:excel', 4),
(7, 1, 1, '角色管理', '/system/role', 1, 'system:role:list', 2),
(8, 7, 2, '角色新增', NULL, NULL, 'system:role:add', 1),
(9, 7, 2, '角色编辑', NULL, NULL, 'system:role:edit', 2),
(10, 7, 2, '角色删除', NULL, NULL, 'system:role:delete', 3),
(11, 1, 1, '菜单管理', '/system/menu', 1, 'system:menu:list', 3),
(12, 11, 2, '菜单新增', NULL, NULL, 'system:menu:add', 1),
(13, 11, 2, '菜单编辑', NULL, NULL, 'system:menu:edit', 2),
(14, 11, 2, '菜单删除', NULL, NULL, 'system:menu:delete', 3),
(15, 1, 1, '操作日志', '/system/log', 1, 'system:log:list', 4),
(16, 15, 2, '清空日志', NULL, NULL, 'system:log:delete', 1),
(17, 15, 2, '日志表格', NULL, NULL, 'system:log:excel', 1);

-- 日志表
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `lid` INT(11) NOT NULL AUTO_INCREMENT COMMENT '日志id',
  `account` VARCHAR(255) DEFAULT NULL COMMENT '请求账号',
  `username` VARCHAR(255) DEFAULT NULL COMMENT '请求姓名',
  `action_title` VARCHAR(255) DEFAULT NULL COMMENT '操作名称',
  `url` VARCHAR(255) DEFAULT NULL COMMENT '请求接口',
  `method` VARCHAR(255) DEFAULT NULL COMMENT '请求类型',
  `params` VARCHAR(255) DEFAULT NULL COMMENT '请求参数',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  PRIMARY KEY (`lid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COMMENT='日志表';



