const Sequelize = require('sequelize');
const sequelize = require('../util/sqlconfig');

const expence = sequelize.define('expence',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    amount: Sequelize.INTEGER,
    description: Sequelize.STRING,
    desType: Sequelize.STRING
});

module.exports = expence;