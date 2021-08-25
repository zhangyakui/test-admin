/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.7.30 : Database - zyk-admin
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`zyk-admin` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `zyk-admin`;

/*Table structure for table `sys_menu` */

DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `mid` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单id',
  `pid` int(11) NOT NULL COMMENT '父级id',
  `type` tinyint(4) NOT NULL COMMENT '菜单类型 0目录 1菜单 2按钮',
  `title` varchar(255) NOT NULL COMMENT '菜单标题',
  `name` varchar(255) DEFAULT NULL COMMENT '组件名称',
  `component` varchar(255) DEFAULT NULL COMMENT '组件',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `path` varchar(255) DEFAULT NULL COMMENT '路由',
  `cache` tinyint(4) DEFAULT NULL COMMENT '是否缓存 0否 1是',
  `permission` varchar(255) DEFAULT NULL COMMENT '权限标识',
  `sort_id` int(11) DEFAULT NULL COMMENT '排序',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日期',
  PRIMARY KEY (`mid`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `component` (`component`),
  UNIQUE KEY `path` (`path`),
  UNIQUE KEY `permission` (`permission`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

/*Data for the table `sys_menu` */

insert  into `sys_menu`(`mid`,`pid`,`type`,`title`,`name`,`component`,`icon`,`path`,`cache`,`permission`,`sort_id`,`create_time`,`update_time`) values 
(1,0,0,'系统管理','system',NULL,'system','system',NULL,NULL,1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(2,1,1,'用户管理','user','@/views/system/user.vue','user','system/user',1,'system:user:list',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(3,2,2,'用户新增',NULL,NULL,NULL,NULL,NULL,'system:user:add',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(4,2,2,'用户编辑',NULL,NULL,NULL,NULL,NULL,'system:user:edit',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(5,2,2,'用户删除',NULL,NULL,NULL,NULL,NULL,'system:user:delete',3,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(6,2,2,'用户表格',NULL,NULL,NULL,NULL,NULL,'system:user:excel',4,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(7,1,1,'角色管理','role','@/views/system/role.vue','role','system/role',1,'system:role:list',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(8,7,2,'角色新增',NULL,NULL,NULL,NULL,NULL,'system:role:add',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(9,7,2,'角色编辑',NULL,NULL,NULL,NULL,NULL,'system:role:edit',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(10,7,2,'角色删除',NULL,NULL,NULL,NULL,NULL,'system:role:delete',3,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(11,1,1,'菜单管理','menu','@/views/system/menu.vue','menu','system/menu',1,'system:menu:list',3,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(12,11,2,'菜单新增',NULL,NULL,NULL,NULL,NULL,'system:menu:add',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(13,11,2,'菜单编辑',NULL,NULL,NULL,NULL,NULL,'system:menu:edit',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(14,11,2,'菜单删除',NULL,NULL,NULL,NULL,NULL,'system:menu:delete',3,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(15,0,0,'账号管理','account',NULL,'account','account',NULL,NULL,2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(16,15,1,'QQ','qq','@/views/account/qq.vue','qq','account/qq',1,'account:qq:list',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(17,16,2,'QQ新增',NULL,NULL,NULL,NULL,NULL,'account:qq:add',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(18,16,2,'QQ编辑',NULL,NULL,NULL,NULL,NULL,'account:qq:edit',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(19,16,2,'QQ删除',NULL,NULL,NULL,NULL,NULL,'account:qq:delete',3,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(20,16,2,'QQ表格',NULL,NULL,NULL,NULL,NULL,'account:qq:excel',4,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(21,15,1,'微信','weixin','@/views/account/weixin.vue','weixin','account/weixin',1,'account:weixin:list',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(22,21,2,'微信新增',NULL,NULL,NULL,NULL,NULL,'account:weixin:add',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(23,21,2,'微信编辑',NULL,NULL,NULL,NULL,NULL,'account:weixin:edit',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(24,21,2,'微信删除',NULL,NULL,NULL,NULL,NULL,'account:weixin:delete',3,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(25,21,2,'微信表格',NULL,NULL,NULL,NULL,NULL,'account:weixin:excel',4,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(27,26,1,'文档文件','office','@/views/file/office.vue','office','file/office',1,'file:office:list',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(28,27,2,'文档上传',NULL,NULL,NULL,NULL,NULL,'file:office:upload',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(29,27,2,'文档下载',NULL,NULL,NULL,NULL,NULL,'file:office:download',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(30,26,1,'脚本文件','script','@/views/file/script.vue','script','file/script',1,'file:script:list',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(31,30,2,'脚本上传',NULL,NULL,NULL,NULL,NULL,'file:script:upload',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(32,30,2,'脚本下载',NULL,NULL,NULL,NULL,NULL,'file:script:download',2,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(33,26,1,'应用文件','app','@/views/file/app.vue','app','file/app',1,'file:app:list',3,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(34,33,2,'应用上传',NULL,NULL,NULL,NULL,NULL,'file:app:upload',1,'2021-08-19 15:01:37','2021-08-19 15:01:37'),
(35,33,2,'应用下载',NULL,NULL,NULL,NULL,NULL,'file:app:download',2,'2021-08-19 15:01:37','2021-08-19 15:01:37');

/*Table structure for table `sys_role` */

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `rid` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `pid` int(11) NOT NULL COMMENT '父级id',
  `type` tinyint(4) NOT NULL COMMENT '类型 0部门 1职位',
  `name` varchar(255) NOT NULL COMMENT '名称 部门/职位',
  `desc` varchar(255) DEFAULT NULL COMMENT '备注',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日期',
  PRIMARY KEY (`rid`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

/*Data for the table `sys_role` */

/*Table structure for table `sys_role_menu` */

DROP TABLE IF EXISTS `sys_role_menu`;

CREATE TABLE `sys_role_menu` (
  `rmid` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色菜单id',
  `rid` int(11) NOT NULL COMMENT '角色id',
  `mid` int(11) NOT NULL COMMENT '菜单id',
  PRIMARY KEY (`rmid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色菜单关系表';

/*Data for the table `sys_role_menu` */

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) NOT NULL COMMENT '姓名',
  `account` varchar(255) NOT NULL COMMENT '账号, 一般采用邮箱作为登录',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `gender` tinyint(4) NOT NULL COMMENT '性别 1男 2女',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号',
  `avatar_path` varchar(255) DEFAULT NULL COMMENT '头像',
  `is_admin` tinyint(4) NOT NULL COMMENT '是否是超级管理员 1超级管理员 2普通管理员',
  `enable` tinyint(4) NOT NULL COMMENT '是否启用 0禁用 1启用',
  `desc` varchar(255) DEFAULT NULL COMMENT '备注',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日期',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

/*Data for the table `sys_user` */

insert  into `sys_user`(`uid`,`username`,`account`,`password`,`gender`,`phone`,`avatar_path`,`is_admin`,`enable`,`desc`,`create_time`,`update_time`) values 
(1,'超级管理员','nannan','$2a$10$QjkL0taIZCaRsiT26KK5aujQhakzSqOefbKw9kJq8RR5WPWSwJySW',0,NULL,NULL,1,1,'拥有最高权限, 不需要映射角色菜单表','2021-08-18 22:42:04','2021-08-18 22:55:17');

/*Table structure for table `sys_user_role` */

DROP TABLE IF EXISTS `sys_user_role`;

CREATE TABLE `sys_user_role` (
  `urid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户角色id',
  `uid` int(11) DEFAULT NULL COMMENT '用户id',
  `rid` int(11) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`urid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关系表';

/*Data for the table `sys_user_role` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
