const express = require('express')
const router = express.Router()
const Authenticationuser = require('../Auth/auth')
const user = require('../Modals/user')
// Add Book into the cart
module.exports = router.post('/cart',Authenticationuser,async(req,res)=>{
    try {
        const {id} = req.body;  // book id
        const userid =  req.user.id;

    const userdata = await user.findById(userid)
    const iscart =   userdata.cart.includes(id);
    if(iscart){
       return res.status(200).json({
            success:true,
            message:"Book is Already in Cart"
        })
    }
    const cartbook =  await user.findByIdAndUpdate(userid,{$push:{cart:id}},{ new: true }).populate('cart')
    return res.status(200).json({
        success:true,
        message:'Book Added to Cart Successfully',
        data:cartbook
    })

    } catch (error) {
        console.log(`Error while Added the book in Cart ${error}`)
    }
})

// remove book from the cart api is Here

module.exports = router.put('/deletecartbook/:bookid',Authenticationuser,async(req,res)=>{
    try {
        const {bookid} = req.params; // this is the book id
        const userid = req.user.id;
        const userdata = await user.findById(userid)
        const bookisincart = userdata.cart.includes(bookid)
        if(!bookisincart){
            return res.status(200).json({
                success:true,
                message:'Book is not in the cart '
            })
        }
        const removebook =  await user.findByIdAndUpdate(userid,{$pull:{cart:bookid}},{new:true}).populate('cart')
        return res.status(200).json({
            success:true,
            message:"Book remove from the Cart",
            data:removebook

        })

    } catch (error) {
        console.log(`Error while Delete the Book from the cart ${error}`)
    }
})

// Cart form the particular user

module.exports =  router.get('/usercart',Authenticationuser,async(req,res)=>{
    try {
        const userid = req.user.id;
        const userdata =  await user.findById(userid).populate('cart')
        const cart =  userdata.cart.reverse()
        return res.status(200).json({
            success:true,
            message:'Fetch user cart details successfully',
            data:cart
        })
    } catch (error) {
        console.log(`Error while Fetching the usercart data ${error}`)
    }
})