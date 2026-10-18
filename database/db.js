const mongoose = require('mongoose');

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongoDB connected succefuly');

    } catch(e) {
        console.error('mongoDB connection failed');
        process.exit(1);
    }
}

module.exports = connectToDB;