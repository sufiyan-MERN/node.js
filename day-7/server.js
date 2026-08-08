const express=require("express")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")

const app=express()
dotenv.config()

app.use(express.json())


app.post("/signup", async (req,res)=>{
    const {username,email,password}=req.body

})

app.post("/signin",(req,res)=>{
    
})



app.get("/todo",(req,res)=>{
    res.json({
        "msg":"get request received"
    })    
})

app.listen("8080",()=>{
    console.log("server is listening at port 8008");
})