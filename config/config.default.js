/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1627109072534_1564';

  // 数据库
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'zyk-admin',
    username: 'root',
    password: '123456',
    logging: false,
    define: {
      raw: true,
      underscored: true,
      freezeTableName: true, // 直接查找设置的表名，默认是表名加s或者es
      timestamps: false,
    },
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  };

  // POST
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
      // 白名单
      domainWhiteList: [ 'http://localhost:8081' ]
    }
  };

  // 跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    // 下面这条加上才能共享跨域session，同时前端ajax请求也要加上响应的参数
    credentials: true, 
  };

  // jwt验证
  config.jwt = {
    secret: 'nannan13572468', // 签名
    expiresIn: '8h', // 有效期
    whiteList: ['/api/login']
  };

  // 参数校验
  config.validate = {
    convert: true,
    validateRoot : false,
    widelyUndefined: false
  };
  
  // add your middleware config here
  config.middleware = ['auth', 'parameter', 'log'];
  // config.middleware = [];

  // 用户请求权限对象
  config.userPermission = {}

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
