module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;
    const AssOther = app.model.define(
        'ass_other', 
        {
            id: { 
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            category: {
                type: STRING,
                allowNull: false
            },
            brand: {
                type: STRING,
                allowNull: false
            },
            specs: {
                type: STRING,
                allowNull: false
            },
            count: {
                type: INTEGER,
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
    return AssOther;
}
