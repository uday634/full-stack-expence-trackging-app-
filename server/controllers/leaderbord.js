const User = require('../models/User');
const Expense = require('../models/Expense'); // Corrected the import name
const Leaderboard = require('../models/Leaderboard');
const sequelize = require('sequelize')
const Sequelize = require('../util/sqlconfig')

exports.getUserLeaderBoard = async (req, res) => {
    try {
      const user =await User.findAll();
      user.sort((a,b)=>b.total_cost-a.total_cost)
      res.json(user)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
