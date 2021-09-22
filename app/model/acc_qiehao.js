module.exports = app => {
    const {STRING, INTEGER, TINYINT, TEXT, DATE} = app.Sequelize;
    const AccQiehao = app.model.define(
        'acc_qiehao', 
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            category: {
                type: STRING,
                allowNull: false,
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
            cookies: {
                type: TEXT,
                allowNull: true
            },
            userInfo: {
                type: TEXT('long'),
                allowNull: true,
                field: 'user_info'
            },
            worksInfo: {
                type: TEXT('long'),
                allowNull: true,
                field: 'works_info'
            },
            platform: {
                type: 'string',
                allowNull: true
            },
            homeLink: {
                type: 'string',
                allowNull: true,
                uniqueKey: true,
            },
            startTime: {
                type: 'string',
                allowNull: true,
                field: 'start_time'
            },
            endTime: {
                type: 'string',
                allowNull: true,
                field: 'end_time'
            },
            homeInfo: {
                type: TEXT('long'),
                allowNull: true,
                field: 'home_info'
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
    return AccQiehao;
}