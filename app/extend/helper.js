const bcrypt = require('bcryptjs')

module.exports = {
    // 加密
    encrypt(password){
        const salt = bcrypt.genSaltSync(10) // 随机字符串
        return bcrypt.hashSync(password, salt)
    },

    // 解密
    decrypt(password, pwd){
        return bcrypt.compareSync(password, pwd) 
    }
}