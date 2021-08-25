module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;
    const WeixinAccount = app.model.define(
        'weixin_account', 
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            category: {
                type: STRING,
                allowNull: false
            },
            headUrl: {
                type: STRING,
                allowNull: true,
                field: 'head_url'
            },
            nickName: {
                type: STRING,
                allowNull: true,
                field: 'nick_name'
            },
            account: {
                type: STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: STRING,
                allowNull: false
            },
            uid: {
                type: STRING,
                unique: true,
                allowNull: false
            },
            phone: {
                type: STRING,
                allowNull: true
            },
            accountStatus: {
                type: STRING,
                allowNull: false,
                field: 'account_status'
            },
            operateStatus: {
                type: STRING,
                allowNull: false,
                field: 'operate_status'
            },
            desc: {
                type: STRING,
                allowNull: true
            },
            createTime: {
                type: DATE, 
                allowNull: true,
                field: 'create_time'
            },
            updateTime: {
                type: DATE,
                allowNull: true,
                field: 'update_time'
            }
        }
    );
   
    return WeixinAccount;
}