const express = require('express')
const Authorization = require('../middleware/auth');
const premiumController = require('../controllers/premiumuser')

const router = express()

router.get('/premium', Authorization.authenticate, premiumController.premimumpending );

router.post('/updatetransactionstatus', Authorization.authenticate, premiumController.premimumverfication);

module.exports = router