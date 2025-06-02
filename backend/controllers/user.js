
const user = require('../models/user');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

exports.signup=async(req,res)=>{
    try{
        const {firstname,lastname,email,password}=req.body;
      
        console.log("FIRSTNAME",firstname)
        console.log("LASTNAME",lastname)
        console.log("EMAILNAME",email)
        console.log("PASSWORDNAME",password)

        if(!firstname || !lastname || !email || !password){
          return  res.json({
                info:"Please fill the details",
                success:false
            })
        }
  
        const checkInDbEmail=await user.findOne({email:email})
        if(checkInDbEmail){
           return res.json({
                info:"You already regitser!",
                success:false
            })
        }

        const hashpassword=await bcrypt.hash(password,10);  
        const createEntryInDatabase=await user.create({firstname:firstname,lastname:lastname,email:email,password:hashpassword,})
      
        return res.json({
            info:"User is created!",
            success:true
        })

    }catch(e){
       res.json({
        info:"Something went Wrong in that code",
        success:false,
        error:e,
       
       })
    }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const User = await user.findOne({ email });
    if (!User) return res.json({ message: 'Invalid credentials',success:false });

    const payload={
        email:User.email,
        id:User.id
    }
    const {firstname,lastname}=User
    if(await bcrypt.compare(password,User.password)){
             const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'24h'})
             const options={
                expires:new Date(Date.now()+3*24*24*60*1000),
                httpOnly:true
             }
             res.cookie("token",token,options).json({
                info:"User Login successfull!",
                UserInfo:{firstname,lastname},
                token,
                success:true
             })

       }else{
          res.json({
            message:"Password is not correct",
            success:false,
          })
       }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};