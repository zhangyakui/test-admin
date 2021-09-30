module.exports = app => {
    const {STRING, INTEGER, TINYINT, DATE} = app.Sequelize;
    const AssComputer = app.model.define(
        'ass_computer', 
        {
            id: { 
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            category: {
                type: TINYINT,
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
            computerId: {
                type: STRING,
                allowNull: false,
                field: 'computer_id'
            },
            specs: {
                type: STRING,
                allowNull: false
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
    return AssComputer;
}
