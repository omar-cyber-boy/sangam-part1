const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// register controller 
const registerUser = async (req, res) => {
    try {
        //extract user info from req body
        const { username, email, password, role } = req.body;

        //if the user is already exist in DB
        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (checkExistingUser) {
            return res.status(404).json({
                success: false,
                message: 'user is already exist, either with same username or same email.'
            })
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user and save it in DB
        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        })

        await newlyCreatedUser.save();

        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: 'user registered succerfyl'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'unable to registered user'
            })
        }



    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}



//login controller

const logingUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        //find if the current user does exist
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid username or password'
            })
        }


        //if the password correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(404).json({
                success: false,
                message: 'Invalid username or password'
            })
        }

        //create user token
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '10m'
        });

        res.status(200).json({
            success: true,
            message: 'logged in succerfyl',
            accessToken
        })




    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}


//change password
const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'user nootttt founnnnnnd'
            })
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordMatch) {
            res.status(401).json({
                success: false,
                message: 'od passwoordddd is incorrrrrrectttttt'
            })
        }


        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = newHashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'user pass has been updated'
        })







    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}




module.exports = { logingUser, registerUser, changePassword }