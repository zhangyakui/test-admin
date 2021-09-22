module.exports = app => {
    const {STRING, INTEGER, TINYINT, DATE} = app.Sequelize;
    const AccWeixin = app.model.define(
        'acc_weixin', 
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nickName: {
                type: STRING,
                allowNull: true,
                field: 'nick_name'
            },
            account: {
                type: STRING,
                uniqueKey: true,
                allowNull: false,
            },
            password: {
                type: STRING,
                allowNull: false
            },
            uid: {
                type: STRING,
                allowNull: true
            },
            phone: {
                type: STRING,
                allowNull: true
            },
            abnormal: {
                type: STRING,
                allowNull: true
            },
            status: {
                type: TINYINT,
                allowNull: false
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
    return AccWeixin;
}