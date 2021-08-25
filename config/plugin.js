'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // },

  // mysql
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  // 接口参数验证
  validate: {
    enable: true,
    package: 'egg-validate'
  },

  // jwt
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },

  //cors
  cors: {
    enable: true,
    package: 'egg-cors'
  }
};
