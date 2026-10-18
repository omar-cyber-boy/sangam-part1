const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const superAdminMiddleware = require('../middleware/isSuperAdmin-middleware');
const getAllUsers = require('../controllers/getallusers-controller');

router.get('/',authMiddleware, superAdminMiddleware, getAllUsers);

module.exports = router;