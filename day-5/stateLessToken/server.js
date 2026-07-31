const express=require("express")
const jwt=require("jsonwebtoken")
const app=express()
const JWT_SECRET = "I love biryani"

app.use(express.json())
let users=[]

function authMiddleware(req, res, next){
    const {token} = req.headers;

    let foundUserName = null;

     foundUserName = jwt.verify(token, JWT_SECRET)

    

    if(foundUserName){
        req.username = foundUserName;
        next()
    } else {
        res.json({
            msg: "not allowed to access protected data"
        })
    }
}

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const userObj = {
    username,
    password,
    email,
  };

  users.push(userObj);

  console.log(users);

  res.status(200).json({
    msg: "User Registered Successfully",
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  let foundUser = null;

  foundUser = users.find((user) => {
    if (user.email == email && user.password == password) {
      return true;
    }
  });

  if (foundUser) {
    const token = jwt.sign({username: foundUser.username}, JWT_SECRET);
    
    res.json({
      msg: "login successful",
      token: token,
    });
  } else {
    res.json({
      msg: "Invalid email or password!",
    });
  }
});

app.use(authMiddleware)

app.get("/me",(req,res)=>{
    const playLoad=req.username
    const userDetails=users.filter((userObj)=>{
        if(userObj.username ==  playLoad.username){
            return true
        }
        else{
            return false
        }
    })
    res.json({
        "data":userDetails
    })
})

app.listen("8080",()=>{
    console.log("server is running at port 8080");
})