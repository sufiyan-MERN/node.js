const mongoose=require("mongoose")
const Schema=mongoose.Schema

const ObjectId=Schema.ObjectId

const TodoSchema=new Schema({
    title:String,
    description:String,
    isDone:Boolean,
    userId:ObjectId
})

const UserSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,  
    },
    password:String,
})


const TodoModel=mongoose.model("todos",TodoSchema)
const UserModel=mongoose.model("users",UserSchema)


module.exports={
    TodoModel,
    UserModel
}