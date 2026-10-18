const express = require('express');
const router = express.Router();

const adminMiddlewar = require('../middleware/isAdmin-middleware');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/welcome',authMiddleware, adminMiddlewar, (req, res) => {
    res.json({
        message: 'welcome to the admin page'
    })
})

module.exports = router;