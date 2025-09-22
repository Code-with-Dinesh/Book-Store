const express = require('express')
const router = express.Router()
const user = require('../Modals/user')
const ordermodel =  require('../Modals/order')
const Authenticationuser = require('../Auth/auth')
// get all order form admin

module.exports =  router.get('/myorder',Authenticationuser,async(req,res)=>{
    try {
        const userdata =  await ordermodel.find().populate({
            path:'book'
        }).populate({
            path:'user'
        })
        return res.status(200).json({
            success:true,
            data:userdata
        })
    } catch (error) {
        
    }
})


module.exports = router.post('/placeorder', Authenticationuser, async (req, res) => {
  try {
    const { order } = req.body;
    const id = req.user.id;
    console.log('Incoming order:', order, id);

    const populatedOrders = []; 

    for (const orderdata of order) {
      
      const newOrder = await new ordermodel({ user: id, book: orderdata._id });
      await newOrder.save();

      
      const populatedOrder = await ordermodel
        .findById(newOrder._id)
        .populate([{ path: 'book' }, { path: 'user' }]);

     
      populatedOrders.push(populatedOrder);

     
      await user.findByIdAndUpdate(id, {
        $push: { order: orderdata._id },
      });

      await user.findByIdAndUpdate(id, {
        $pull: { cart: orderdata._id },
      });
    }


    return res.status(200).json({
      success: true,
      message: 'Order Placed Successfully',
      data: populatedOrders, 
    });
  } catch (error) {
    console.error(`Error while placing order: ${error.message}`, error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});


  
  
  

