module.exports = app => {
    const {STRING, INTEGER, TINYINT, DATE} = app.Sequelize;
    const AssPhone = app.model.define(
        'ass_phone', 
        {
            id: { 
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            type: {
                type: TINYINT,
                allowNull: false
            },
            phoneId: {
                type: STRING,
                allowNull: false,
                uniqueKey: true,
                field: 'phone_id'
            },
            name: {
                type: STRING,
                allowNull: false
            },
            brand: {
                type: STRING,
                allowNull: false
            },
            model: {
                type: STRING,
                allowNull: false
            },
            sysVer: {
                type: STRING,
                allowNull: false,
                field: 'sys_ver'
            },
            memory: {
                type: STRING,
                allowNull: false
            },
            disk: {
                type: STRING,
                allowNull: false
            },
            devNum: {
                type: STRING,
                allowNull: false,
                uniqueKey: true,
                field: 'dev_num'
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
    return AssPhone;
}
