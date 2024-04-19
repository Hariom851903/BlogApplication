require("dotenv").config();

const corse = require("cors");
const express= require("express");
const asyncHandler=require('express-async-handler');
const connectDB= require('./utils/connectDB');
const Post=require("./models/Post");
connectDB();
const app = express();

const PORT=5000;



//Middlewares
app.use(express.json()); //Pass json data
// corse middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(corse(corsOptions));
// ! Create post
app.use((error, req, res, next) => {
    console.error(error); // Logging the error
    return res.status(500).json({ message: 'Internal Server Error' });
});

// Route to create a new post
app.post("/api/v1/posts/create", asyncHandler(async (req, res) => {
    // Get the payload
    const { postData } = req.body;
    
    // Create a new post
    const postCreated = await Post.create(postData);
    
    // Respond with success message
    res.json({
        status: "success",
        message: "Post created successfully",
        postCreated,
    });
}));
// ! List posts
app.get("/api/v1/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "success",
      message: "Post fetched successfully",
      posts,
    });
  } catch (error) {
    res.json(error);
  }
});

// ! update post
app.put("/api/v1/posts/:postId", async (req, res) => {
  try {
    //get the post id from params
    const postId = req.params.postId;
      console.log("dhvbcjm");
    //find the post
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post  not found");
    }
    //update
    const postUpdted = await Post.findByIdAndUpdate(
      postId,
      { title: req.body.title, description: req.body.description },
      {
        new: true,
      }
    );
     return res.json({
      status: "Post updated successfully",
      postUpdted,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// ! get post
app.get("/api/v1/posts/:postId", async (req, res) => {
  try {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    const postFound = await Post.findById(postId);
    res.json({
      status: "success",
      message: "Post fetched successfully",
      postFound,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// ! delete post
app.delete("/api/v1/posts/:postId", async (req, res) => {
  try {
    console.log("delete");
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    await Post.findByIdAndDelete(postId);
    res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//!Start the server
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));