const mongoose=require("mongoose");

const CommentSchema=mongoose.Schema({

username:{
  type:String,
  required:true
},
  title :{
    type:String,
    required:true,
    unique:true
  },
  comments:{
    type:Array,
    required:true
  }

},
{timestamps:true}
);


module.exports=mongoose.model("Comment",CommentSchema);
