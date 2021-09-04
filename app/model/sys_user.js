module.exports = app => {
    const {STRING, INTEGER, TINYINT, DATE} = app.Sequelize;
    const SysUser = app.model.define(
        'sys_user', 
        {
            uid: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: STRING,
                allowNull: false
            },
            account: {
                type: STRING,
                uniqueKey: true,
                allowNull: false
            },
            password: {
                type: STRING,
                allowNull: false,
            },
            gender: {
                type: TINYINT,
                allowNull: false
            },
            phone: {
                type: STRING,
                allowNull: true
            },
            isAdmin: {
                type: TINYINT,
                allowNull: false,
                field: 'is_admin'
            },
            enable: {
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
    return SysUser;
}