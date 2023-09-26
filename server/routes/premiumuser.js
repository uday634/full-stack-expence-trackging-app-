const express = require('express')
const Authorization = require('../middleware/auth');
const premiumController = require('../controllers/premiumuser')
// const leaderboardData = require('../models/Leaderboard') 
const leaderbordController  = require('../controllers/leaderbord');
// const Expense = require('../models/Expense');
const User = require('../models/User');
const Expense = require('../models/Expense'); // Corrected the import name
const Leaderboard = require('../models/Leaderboard');
const router = express()

router.get('/premium', Authorization.authenticate, premiumController.premimumpending );

router.post('/updatetransactionstatus', Authorization.authenticate, premiumController.premimumverfication);

router.get('/leaderboard', Authorization.authenticate,leaderbordController.getUserLeaderBoard);


module.exports = router