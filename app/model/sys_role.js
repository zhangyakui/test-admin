module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;
    const SysRole = app.model.define(
        'sys_role', 
        {
            rid: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            pid: {
                type: INTEGER,
                allowNull: false
            },
            type: {
                type: INTEGER,
                allowNull: false,
            },
            name: {
                type: STRING,
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
    return SysRole;
}