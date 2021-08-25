module.exports = app => {
    const {INTEGER} = app.Sequelize
    const SysUserRole = app.model.define(
        'sys_user_role', 
        {
            urid: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            uid: {
                type: INTEGER,
                allowNull: false
            },
            rid: {
                type: INTEGER,
                allowNull: false
            }
        }
    );
    return SysUserRole
}