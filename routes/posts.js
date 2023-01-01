const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  const user = await User.findOne({ username: req.body.username });
  !user && res.status(400).json("Wrong credentials!");


    if(user){
      try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  console.log(catName);
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/like", async (req,res) =>{
  const username = req.body.username;
  const postname = req.body.title;
  // const like = req.body.like;


  Post.findOne({title:postname},async(err, response)=>{
    User.findOne({username:username},async(err,founduser)=>{
      if(err){
        res.status(500).json(err);
      }
      if(!founduser){
        res.status(500).json("user not found");
      }
      else{

            if(response.like.includes(username)){
                res.status(200).json({"like":response.like.length-1});
            }else{
              response.like.push(username);
              response.save();
              res.status(200).json({"like":response.like.length-1});

            }


      }
    })

  });
  });

  router.post("/unlike", async (req,res) =>{
    const username = req.body.username;
    const postname = req.body.title;
    // const like = req.body.like;


    Post.findOne({title:postname},async(err, response)=>{
      User.findOne({username:username},async(err,founduser)=>{
        if(err){
          res.status(500).json(err);
        }
        if(!founduser){
          res.status(500).json("user not found");
        }
        else{

              if(response.unlike.includes(username)){
                  res.status(200).json({"unlike":response.unlike.length-1});
              }else{
                response.unlike.push(username);
                response.save();
                res.status(200).json({"unlike":response.unlike.length-1});

              }
        }
      })


    });

});

module.exports = router;
