const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json({
            message: 'everythin is okaaaaay, from getAllUsers Controller',
            allUsers: allUsers
        })
    } catch(e) {
        res.status(500).json({
            message: 'something went wrong, from getAllUsers controller', 
            error: e.message
        })
        console.error(e);
    }
    
}

module.exports = getAllUsers;