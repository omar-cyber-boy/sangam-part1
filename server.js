require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db')
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const getallusersRoute = require('./routes/getallusers-routes');
const uploadImageRoutes = require('./routes/image-routes');


connectToDB();

const app = express();
const port = process.env.PORT || 3500;


//middleware
app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/allusers', getallusersRoute);
app.use('/api/image', uploadImageRoutes)

app.listen(port, ()=>{
    console.log(`server is listening ${port}`);
});