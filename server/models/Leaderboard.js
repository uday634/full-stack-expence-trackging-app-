const Sequelize = require('sequelize')
const sequelize = require('../util/sqlconfig')

const Leaderboard = sequelize.define('Leaderboard', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Ensure one leaderboard entry per user
    },
    totalExpenses: Sequelize.INTEGER
});

module.exports = Leaderboard;
