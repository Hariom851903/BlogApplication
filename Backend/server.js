require("dotenv").config();
const express= require("express");
const connectDB= require('./utils/connectDB');
connectDB();
const app = express();

const PORT=5000;
app.listen(PORT,()=>{
    console.log("App runing 5000 port");
})