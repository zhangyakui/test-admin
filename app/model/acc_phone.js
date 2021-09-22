module.exports = app => {
    const {STRING, INTEGER, TINYINT, DATE} = app.Sequelize;
    const AccPhone = app.model.define(
        'acc_phone', 
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            cardName: {
                type: STRING,
                uniqueKey: true,
                allowNull: false,
                field: 'card_name'
            },
            number: {
                type: STRING,
                uniqueKey: true,
                allowNull: false
            },
            status: {
                type: TINYINT,
                allowNull: false,
            },
            agent: {
                type: STRING,
                allowNull: false
            },
            operator: {
                type: TINYINT,
                allowNull: false
            },
            iccid: {
                type: STRING,
                allowNull: true
            },
            puk: {
                type: STRING,
                allowNull: true
            },
            realInfo: {
                type: STRING,
                allowNull: true,
                field: 'real_info'
            },
            local: {
                type: STRING,
                allowNull: true
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
    return AccPhone;
}