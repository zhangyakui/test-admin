module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;
    const SysLog = app.model.define(
        'sys_log', 
        {
            lid: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            account: {
                type: STRING,
                allowNull: false
            },
            username: {
                type: STRING,
                allowNull: false
            },
            actionTitle: {
                type: STRING,
                allowNull: false,
                field: 'action_title'
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
                type: STRING,
                allowNull: false
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