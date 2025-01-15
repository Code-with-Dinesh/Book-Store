const express = require('express')
const router = express.Router()
const user = require('../Modals/user')
const Authenticationuser = require('../Auth/auth')

// Books are added to Favourite
module.exports = router.put('/favourite',Authenticationuser,async(req,res)=>{
    try {
        const {id} = req.body; // this is the book id
        const userid = req.user.id;
        
        const userdata =  await user.findById(userid)
        const  isfavourite = userdata.favourite.includes(id);
        if( isfavourite){
            return res.status(200).json({
                success:false,
                message:'Book are already in Favourite'
            })
        }
        await user.findByIdAndUpdate(userid,{$addToSet:{favourite:id}}),{ new: true }
         return res.status(200).json({
            success:true,
            message:'Book are added to Favourite successfully'
        })
    } catch (error) {
        console.log(`Error while favouite ${error}`)
    }
})

// Book delete to the favourite

module.exports = router.delete('/deletefavorite',Authenticationuser,async(req,res)=>{
      try {
        const {id}  = req.body; // this is the book id
        const userid = req.user.id;
        
        const userdata = await user.findById(userid)
        const isfav = await userdata.favourite.includes(id)
        const deletebook =  await user.findByIdAndUpdate(userid,{$pull:{favourite:id}})
        if(isfav){
            return res.status(200).json({
                success:true,
                message:'Book delete To favourite successfully'
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:'Failed to remove book from the favourite'
            })
        }
      } catch (error) {
        console.log(`Error while delete from the favorites ${error}`)
      }
})

// Favourite book of a particular user

module.exports  =  router.get('/getfavbook',Authenticationuser,async(req,res)=>{
    try {
        const id = req.user.id;
        const userdata = await user.findById(id).populate("favourite")
        const allfavbook =  userdata.favourite
        if(!allfavbook){
            return res.status(200).json({
                success:true,
                message:"Not Books are in Favorite yet"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Your all Favorite books",
            data:allfavbook,
        })
    } catch (error) {
        console.log(`error while fetching the all books ${error}`)
    }
})

