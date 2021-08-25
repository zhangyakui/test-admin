module.exports = app => {
    const {INTEGER} = app.Sequelize
    const SysRoleMenu = app.model.define(
        'sys_role_menu', 
        {
            rmid: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            rid: {
                type: INTEGER,
                allowNull: false
            },
            mid: {
                type: INTEGER,
                allowNull: false
            }
        }
    );
    return SysRoleMenu
}