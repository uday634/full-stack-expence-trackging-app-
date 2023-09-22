const Sequelize = require('sequelize');
const sequelize = require('../util/sqlconfig');

const signUser = sequelize.define('signUser',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
        type:Sequelize.STRING,
        unique: true,
        validate:{
            isEmail:true,
        }
    },
    password:Sequelize.STRING
});

module.exports = signUser;