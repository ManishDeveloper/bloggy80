const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const auth = require("../middleware/auth");


//@route    POST /api/users/auth
//@desc     Find Auth User
//@access   Public
router.get('/auth',auth,async (req,res)=>{
    try {
      let user = await Users.findById(req.user.id).select('-password');
      
      return res.status(200).json(user);
      
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'})
    }
});


//@route    POST /api/users
//@desc     Register user
//@access   Public
router.post('/register',
[check('name','Name is required').notEmpty(),
check('email','Email is required').notEmpty(),
check('email','Email is not Valid').isEmail(),
check('password','Password is required').notEmpty(),
check('password','Password should have 6 characters').isLength({min:6})] ,async (req,res)=>{

    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg});
    }
    try {
    let {name,email,password} = req.body;

    //check already register
    let userExist = await Users.findOne({email});

    if(userExist){
        return res.status(400).json({error:'User is already exists!'})
    }

    let salt = await bcrypt.genSalt(10);

    let hasPassword = await bcrypt.hash(password,salt);
   
    let newUser = new Users({name,email,password:hasPassword});

    await newUser.save();

    const payload = {
        user:{
            id:newUser.id
        }
    }

    jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:3600000},(err,token)=>{
        if(err) throw err;
        return res.status(200).json({token});
    });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:'Server Error'});
    }
});



//@route    POST /api/users/login
//@desc     user login
//@access   Public
router.post('/login',[
check('email','Email is required').notEmpty(),
check('email','Email is not Valid').isEmail(),
check('password','Password is required').notEmpty()],async (req,res)=>{

    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg});
    }
    
    try {
        let {email,password} = req.body;

        //check userExist
        let userExist = await Users.findOne({email});

        if(!userExist){
            return res.status(404).json({error:'User is not Exist!'});
        }

        //check password
        let checkPass = await bcrypt.compare(password,userExist.password);

        if(!checkPass){
            return res.status(404).json({error:'Wrong Password!'});
        }

        let payload = {
            user:{
                id:userExist.id
            }
        }

        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:3600000},(err,token)=>{
            if(err) throw err;
            return res.status(200).json({token});
        })

        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});

module.exports = router;