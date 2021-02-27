const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log('db connected..')})
.catch((err)=>console.log(err));