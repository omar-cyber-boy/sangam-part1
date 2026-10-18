const isAdmin = (req, res, next) => {
    try {
        if (req.userInfo.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'you are not admin, from middleware is admin'
            })
        }
        next();
        
    } catch(e) {
        res.status(500).json({
            message: 'something went wrong, from middleware is super admin',
            error: e.message
        })
        console.error(e);
    }
}

module.exports = isAdmin;