const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

//@route    POST /api/users
//@desc     Register user
//@access   Public
router.post('/',async (req,res)=>{

    try {
    let {name,email,password} = req.body;

    //check already register
    let userExist = await Users.findOne({email});

    if(userExist){
        return res.status(400).json({error:'User is already exists!'})
    }
   
    let newUser = new Users({name,email,password});

    await newUser.save();

    return res.status(200).json(newUser);

    } catch (error) {
        console.log('error.message');
        res.status(500).json({error:'Server Error'})
    }
});

module.exports = router;