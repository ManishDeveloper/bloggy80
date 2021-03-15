const mongoose = require("mongoose");
require("dotenv").config({path:__dirname + `/../../.env`});


mongoose.connect(process.env.MONGO_LIVE_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
})
.then((conn)=>{console.log(`db connected.. ${conn.connection.host}`)})
.catch((err)=>console.log(err));