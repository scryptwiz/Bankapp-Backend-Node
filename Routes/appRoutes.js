const express = require('express')
const router = express.Router()
const signupController = require('../Controllers/signupController')
const signinController = require('../Controllers/signinContoller')
const dashboardController = require('../Controllers/dashboardController')


router.post('/signup', signupController.signup)
router.post('/signin', signinController.signin)
router.get('/loadDashboard', dashboardController.loadDashboard)
 
module.exports = router;