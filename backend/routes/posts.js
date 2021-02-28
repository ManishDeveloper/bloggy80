const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts");
const multer = require("multer");
const auth = require("../middleware/auth");

//@route    POST /api/posts/create
//@desc     Create Post
//@access   Private
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/src/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  });
   
let upload = multer({ storage: storage });

router.post('/create',[upload.single('image'),auth],async (req,res)=>{
    try {
        let {title,description} = req.body;

        let newPosts = new Posts({user:req.user.id,title,description,image:req.file.filename});

        await newPosts.save();
        return res.status(201).json(newPosts);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'server error'});
    }
})


module.exports = router;