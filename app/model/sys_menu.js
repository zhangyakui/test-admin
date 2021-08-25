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
                uniqueKey: true,
                allowNull: false,
            },
            name: {
                type: STRING,
                allowNull: true
            },
            component: {
                type: STRING,
                allowNull: true
            },
            icon: {
                type: STRING,
                allowNull: true
            },
            path: {
                type: STRING,
                allowNull: true
            },
            cache: {
                type: TINYINT,
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