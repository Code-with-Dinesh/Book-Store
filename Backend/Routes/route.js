const express = require('express');
const router = express.Router();
const user = require('../Modals/user')
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../Auth/auth');
const Authenticationuser = require('../Auth/auth');
module.exports =  router.post('/signup',async(req,res)=>{
   try {
    const { username, email, password, address } = req.body;

    if (!(username && email && password && address)) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }
    const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email is already used',
            });
        }
        const hashpassword = await bcrypt.hash(password,10)
        const newuser = await user.create({
            username,
            email,
            address,
            password:hashpassword, 
        });   
 
        const token = jwt.sign({
            id:newuser._id,
            email:newuser.email,
        },
        "mykey",
        {expiresIn:'3h'}
    )
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        domain:"www.dinesh.com",
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
        expires:'3h'
    });
        return res.status(200).json({
        success:true,
        message:'User Created successfully', 
        
        data:{
            id:newuser._id,
            username:newuser.username,
            email:newuser.email,
            role:newuser.role,
            token
        }
    })
   } catch (error) {
      console.log(error)
   }
})

// Login Route

module.exports = router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!(email && password)){
           return res.status(400).json({
                success:false,
                message:'Email or Password Required'
            })
        }
        const existenceuser = await user.findOne({email})  
        if(!existenceuser){
         return   res.status(400).json({
                success:false,
                message:'User is not Available'
            })
        }
       const ispasswordmatch =  await bcrypt.compare(password,existenceuser.password)
       if(! ispasswordmatch){
        return res.status(400).json({
            success:false,
            message:'Invalid Credentials'
        })
       }
       // is Everything is good then generate the token
       const token = jwt.sign({
        id:existenceuser._id,
        email:existenceuser.email
       },
       'mykey',
       {expiresIn:"3h"}

    
       )
       res.cookie('token',token,{
        httpOnly:true,
       
       })

        return res.status(200).json({
        success:true,
        message:'Logged In Successfully',
        data:{
            id:existenceuser._id,
            email:existenceuser.email,
            username:existenceuser.username,
            role:existenceuser.role,
            token
        }
       })
       
    } catch (error) {
        console.log(`Errror while login ${error}`)
    }
})

module.exports = router.get('/dashboard',Authenticationuser,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Access granted to protected route',
        user:req.user
    })
})