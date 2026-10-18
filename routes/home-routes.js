const express = require('express');
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router();

router.get('/welcome',authMiddleware, (req,res)=>{
    const {username, userId, role} = req.userInfo
    res.json({
        message: 'welcome to home page',
        userInfo: {
            username,
            userId,
            role
        }
    });
    console.log('the home page response');
})

module.exports = router;