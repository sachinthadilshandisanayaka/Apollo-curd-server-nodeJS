const sequelize = require('sequelize');
export default new sequelize('postgres', 'postgres', 'password', {
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});