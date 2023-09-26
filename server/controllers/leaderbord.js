const User = require('../models/User');
const Expense = require('../models/Expense'); // Corrected the import name
const Leaderboard = require('../models/Leaderboard');
const sequelize = require('sequelize')
const Sequelize = require('../util/sqlconfig')

exports.getUserLeaderBoard = async (req, res) => {
    try {
      const leaderboardofusers = await User.findAll({
        attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('Expenses.amount')), 'total_cost']], // Use 'Expenses' instead of 'expenses'
        include: [
            {
                model: Expense,
                attributes: []
            }
        ],
        group: ['User.id'],
        order: [[sequelize.literal('total_cost'), 'DESC']] // Order by total_cost in descending order
      })

      res.status(200).json(leaderboardofusers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
