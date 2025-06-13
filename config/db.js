 const mongoose = require('mongoose');
 const dotenv = require('dotenv').config();
 
 mongoose.connect(process.env.MONGO_URI)
     .then(() => {
         console.log('database connected');
     })
     .catch((error) => {
         console.log("database connection error", err);
     })