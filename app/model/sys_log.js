module.exports = app => {
    const {STRING, INTEGER, TEXT, DATE} = app.Sequelize;
    const SysLog = app.model.define(
        'sys_log', 
        {
            id: { 
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            account: {
                type: STRING,
                allowNull: false
            },
            userName: {
                type: STRING,
                allowNull: false,
                field: 'user_name'
            },
            title: {
                type: STRING,
                allowNull: false
            },
            url: {
                type: STRING,
                allowNull: false
            },
            method: {
                type: STRING,
                allowNull: false
            },
            params: {
                type: TEXT('long'),
                allowNull: true
            },
            createTime: {
                type: DATE, 
                allowNull: true,
                field: 'create_time'
            }
        }
    );
    return SysLog;
}