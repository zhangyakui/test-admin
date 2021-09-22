module.exports = app => {
    const {STRING, INTEGER, TINYINT, DATE} = app.Sequelize;
    const SysMenu = app.model.define(
        'sys_menu', 
        {
            mid: {
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
                type: TINYINT,
                allowNull: false,
            },
            title: {
                type: STRING,
                uniqueKey: false,
                allowNull: false,
            },
            path: {
                type: STRING,
                allowNull: true
            },
            permission: {
                type: STRING,
                allowNull: true,
            },
            sortId: {
                type: INTEGER,
                allowNull: true,
                field: 'sort_id'
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
    return SysMenu;
}