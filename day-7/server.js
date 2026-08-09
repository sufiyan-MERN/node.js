const dns=require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { UserModel, TodoModel } = require("./utils/database");

const app = express();

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
console.log("database url", databaseUrl);

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL in environment variables");
}

app.use(express.json());

mongoose.connect(databaseUrl);

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const feedback = await UserModel.create({
    username, 
    email,
    password,
  });

  res.json({
    msg: "user registered successfully",
    feedback,
  });
});

app.post("/signin", async (req, res) => {
  const {email,password}=req.body
  const foundUser= await UserModel.find({
    email:email,
    password:password,
  })
  if(foundUser != undefined){
    const token=jwt.sign({id:foundUser[0]._id.toString()},process.env.JWT_SECRET)
  
  res.json({
    msg:"login successfull",
    token:token

  })
}
  else{
    res.json({
      msg:"invalid credentials"
    })
  }
});

app.get("/me", async(req, res)=>{
    const userId = req.userId;

    const data = await UserModel.find({_id: userId});

    res.json({data})
})  

app.get("/todo", async (req, res) => {

  const   userId=req.userId
  const data=await todoModel.find({
    userId,
  })

  res.json({
    msg: "get request received",
  });
});

app.listen("8080", () => {
  console.log("server is listening at port 8080");
});
