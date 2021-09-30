module.exports = app => {
    const {STRING, INTEGER, TINYINT, DATE} = app.Sequelize;
    const ApprReimburse = app.model.define(
        'appr_reimburse', 
        {
            id: { 
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            imgUrl: {
                type: STRING,
                allowNull: false,
                field: 'img_url'
            },
            category: {
                type: STRING,
                allowNull: false
            },
            price: {
                type: INTEGER,
                allowNull: false
            },
            reason: {
                type: STRING,
                allowNull: true
            },
            applyAccount: {
                type: STRING,
                allowNull: true,
                field: 'apply_account'
            },
            applyName: {
                type: STRING,
                allowNull: true,
                field: 'apply_name'
            },
            adoptName: {
                type: STRING,
                allowNull: true,
                field: 'adopt_name'
            },
            settlementName: {
                type: STRING,
                allowNull: true,
                field: 'settlement_name'
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
    return ApprReimburse;
}