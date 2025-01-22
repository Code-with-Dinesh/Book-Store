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

// Delete a book from Favourite
module.exports = router.put('/deletefavorite', Authenticationuser, async (req, res) => {
    try {
        const { id } = req.body; // this is the book id
        const userid = req.user.id;

        const userdata = await user.findById(userid);
        const isFavourite = userdata.favourite.includes(id);
        if (!isFavourite) {
            return res.status(200).json({
                success: false,
                message: 'Book is not in Favourite'
            });
        }

        await user.findByIdAndUpdate(userid, { $pull: { favourite: id } }, { new: true });
        return res.status(200).json({
            success: true,
            message: 'Book removed from Favourite successfully'
        });
    } catch (error) {
        console.log(`Error while removing from favourite ${error}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});
// Book delete to the favourite



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

