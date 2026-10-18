const User = require('../models/User');

const isSuperAdmin = (req, res, next) => {

    try {
        if (req.userInfo.role !== 'superAdmin') {
            return res.status(403).json({
                success: false,
                message: 'you are not super admin, from middleware is super admin'
            })
        }

        next();

    } catch (e) {
        res.status(500).json({
            message: 'something went wrong, from middleware is super admin',
            error: e.message
        })
        console.error(e);
    }

}

module.exports = isSuperAdmin;