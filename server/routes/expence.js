const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = require('../util/sqlconfig')
const expence = require('../models/Expense')
const expenceController = require('../controllers/expence')
const userautheincation = require('../middleware/auth')

const router = express.Router();


router.post('/addExpence', userautheincation.authenticate, expenceController.exportsData)

router.get('/getExpence',userautheincation.authenticate, expenceController.sendData)

router.delete('/deleteExpence/:id', expenceController.deleteData);


module.exports = router