module.exports = app => {
    const {STRING, INTEGER, TINYINT, TEXT, DATE} = app.Sequelize;
    const emailAli = app.model.define(
        'email_ali', 
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            account: {
                type: STRING,
                uniqueKey: true,
                allowNull: false,
            },
            password: {
                type: STRING,
                allowNull: false
            },
            phone: {
                type: STRING,
                allowNull: true
            },
            cookies: {
                type: TEXT,
                allowNull: true
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
    return emailAli;
}