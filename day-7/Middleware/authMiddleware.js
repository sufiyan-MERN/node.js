const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")

dotenv.config()

const authMiddleWare=(req,res,next)=>{
    const {token}=req.headers
    const payload=jwt.verify(token,process.env.JWT_SECRET)

    if(payload){
        req.userId=payload.Id
        next()
    } else{
        res.json({
            msg:"invalid token"
        })
    }
}

module.exports= authMiddleWare