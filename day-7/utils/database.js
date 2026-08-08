const mongoose=require("mongoose")
const Schema=mongoose.Schema

const ObjectId=Schema.ObjectId

const todoSchema=new Schema({
    title:String,
    description:String,
    isDone:Boolean,
    userId:ObjectId
})

const userSchema=new Schema({
    username:String,
    email:String,
    password:String,
})


const todoModel=mongoose.model("todos",todoSchema)
const userModel=mongoose.model("user",userSchema)


module.exports({
    todoModel,
    userModel
})