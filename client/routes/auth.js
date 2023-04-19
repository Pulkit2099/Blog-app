const router =require("express").Router()

const User=require("../models/User")
const  bcrypt=require('bcrypt')

//register route

router.post('/register',async (req,res)=>{

      try{

    const salt=await bcrypt.genSalt(10)
    const hashedpass=await bcrypt.hash(req.body.password,salt)


//we can send anything to this body eg username password
  const newUser=new User({
            
       username:req.body.username,
       email : req.body.email,
       //using our hashedpassword
       password:hashedpass,
    

      })
      //save method coming from mongoose
       const user =await newUser.save()
    //if everything is success then we send res
    res.status(200).json(user)


    } catch(err){
        res.status(500).json(err)
    
      }


})


//login api

router.post('/login',async(req,res)=>{

    try{
        const user= await User.findOne({username:req.body.username})
             //if there is no user then 
             !user&&res.status(400).json("wrong credintials")
//we have to compare hashpassword and actual login password then user can login

const validate=await bcrypt.compare(req.body.password,user.password) 
//.if not validate
!validate&&res.status(400).json("wrong credintials")

//if everything is ok then 
res.status(200).json(user)


    }
    catch(err){
        res.status(500).json(err)

    }




})





module.exports=router