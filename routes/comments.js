const router= require("express").Router();
const mongoose=require("mongoose");
const User=require("../models/User");
const Post =require("../models/Post");
const Comment = require("../models/Comment");



const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);



router.get("/:id",function (req,res){
  const title = req.query.title;
  const id= req.params.id;


      Comment.findOne({title:title},function(err,founduser){


      var i=0;
      const length= founduser.comments.length;
      while(i<length){
      if(id==founduser.comments[i]._id){
      res.status(200).json(founduser.comments[i].name);
      break;
     }
    else{
      i++;
    }

  }

   });


  });


  router.get("/allcomment",function (req,res){
    const title = req.query.title;

try{
        Comment.findOne({title:title},function(err,founduser){
          if(!founduser){
          res.status(404).json("Post  not found");
           }
           try{
             res.status(200).json(founduser)
           }
         catch(err){
           res.status(500).json(err);
         }


     });
}
catch(err){
  res.status(500).json(err);
}


    });




router.post("/",function(req,res){

const username=req.body.username;
const title=req.body.title;
const comment = req.body.comment;

const newcomment=new Item({
  name :comment
});


User.findOne({username:username},function(err,founduser){
  if(!founduser){
    res.status(404).json("User Not Found");
  }
  else{

    Post.findOne({title:title},function(err,user){
      if(!user){
        res.status(404).json("Post Does not exist");
    }

    else{

               Comment.findOne({title:title},function(err,user){
                 // res.status(200).json(user);
                 if(!user){
                   const newcomments= new Comment({
                     username:username,
                     title:title,
                     comments:newcomment
                   });
                    newcomments.save(function(err,user){
                      if(!err){
                        res.status(200).json(user);
                      }
                      else{
                        res.status(500).json(err);
                      }
                    });
                 }else{


                 user.comments.push(newcomment);
                 user.save(function(err,founduser){
                   if(err){
                     res.status(500).json(err);
                   }
                   else{
                     res.status(200).json(user);
                   }

                 });
               }

               });
         }
    })


  }
});



});





module.exports=router;
