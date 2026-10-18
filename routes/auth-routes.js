const express = require('express');
const router = express.Router();

const {registerUser, logingUser, changePassword} = require('../controllers/auth-Controller')
const authMiddleware = require('../middleware/auth-middleware')


//all routes are related to authentecation & authorization 
router.post('/register', registerUser);
router.post('/login', logingUser);
router.post('/change-pwd', authMiddleware, changePassword);



module.exports = router;