const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts");
const multer = require("multer");
const auth = require("../middleware/auth");
const slugify = require("slugify");
const mongoose = require("mongoose");

//@route    POST /api/posts/create
//@desc     Create Post
//@access   Private
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, slugify(Date.now() + file.originalname,{replacement: '-'}))
    }
  });
   
let upload = multer({ storage: storage });

router.post('/create',[upload.single('image'),auth],async (req,res)=>{
    try {
        let {title,description} = req.body;

        let imageSlugify = slugify(req.file.filename,{replacement: '-'});

        let newPosts = new Posts({user:req.user.id,title,description,image:imageSlugify});

        await newPosts.save();
        return res.status(201).json(newPosts);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'server error'});
    }
});

//@routes   get /api/posts
//@desc     Get All Posts
//@access   Public
router.get('/', async (req,res)=>{
    try {
        let getPosts = await Posts.find().populate('user',['name']);

        return res.status(200).json(getPosts);

    } catch (error) {
       console.log(error.message);
       return res.status(500).json({error:'Server Error'}); 
    }
});


//@routes   get /api/posts/:id
//@desc     Get Post by Id
//@access   Public
router.get('/:id', async (req,res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({error:'Invalid ID'})
        }

        let getPost = await Posts.findById(req.params.id);

        if(!getPost){
            return res.status(404).json({error:'No Post Found!'})
        }

        return res.status(200).json(getPost);

    } catch (error) {
       console.log(error.message);
       return res.status(500).json({error:'Server Error'}); 
    }
});


//@routes   get /api/posts/user-post
//@desc     Get Login user post
//@access   Private
router.get('/user/user-post',auth, async (req,res)=>{
    try {

        let getPost = await Posts.find({user:req.user.id});

        if(!getPost){
            return res.status(404).json({error:'No Post Found!'})
        }

        return res.status(200).json(getPost);

    } catch (error) {
       console.log(error.message);
       return res.status(500).json({error:'Server Error'}); 
    }
});

//@routes   put /api/posts/udpate
//@desc     Update Post
//@access   Private
router.patch('/update/:id',[upload.single('image'),auth],async (req,res)=>{
    
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({error:'Invalid ID'})
        }

        let checkPost = await Posts.findById(req.params.id);

        if(!checkPost){
            return res.status(404).json({error:'No Post Found!'})
        }

        //Create Update Object
        let updateFields = {}

        if(req.body.title) updateFields.title = req.body.title;
        if(req.body.description) updateFields.description = req.body.description;
        if(req.file) updateFields.image = req.file.filename;

        await Posts.findOneAndUpdate(req.params.id,updateFields,{new:true},(err,post)=>{
            if(err) throw err;
            return res.status(201).json(post);
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'})
    }
});


//@routes   delete /api/posts/delete/:id
//@desc     Delete post
//@access   Private
router.delete('/delete/:id',auth,async (req,res)=>{

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({error:'Invalid Id'});
        }

        let checkPost = await Posts.findById(req.params.id);

        if(!checkPost){
            return res.status(404).json({error:'Post not Found!'});
        }

        await checkPost.remove();

        return res.status(200).json({'msg':'remove post'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'})
    }
})

module.exports = router;