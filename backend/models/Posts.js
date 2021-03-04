const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model("posts",postSchema);