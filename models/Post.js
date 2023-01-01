const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    like:{
      type:Array,
      default:"Initial"
    },
    unlike:{
      type:Array,
      default:"Initial"
    },
    comments:{
      type:Array,
      default:""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
