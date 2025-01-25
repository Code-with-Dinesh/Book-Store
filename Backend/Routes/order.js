const express = require('express')
const router = express.Router()
const user = require('../Modals/user')
const ordermodel =  require('../Modals/order')
const bookmodel =  require("../Modals/book")
const Authenticationuser = require('../Auth/auth')

// module.exports = router.get('/allorders', Authenticationuser, async (req, res) => {
//   try {
//     const id = req.user.id; // this is the user id
    
//     // Fetch user and their orders, with user and book details populated
//     // const userdata = await user.findById(id).populate({
//     //   path: 'order',  // Populate the 'order' field of the user model
//     //   populate: {
//     //     path: 'book', // Populate the 'book' field of the 'order' model
//     //     model: 'book', // Ensure you are populating from the correct model
//     //   },
//     // });
//     const userdata =  await user.findById(id)
//     console.log(userdata)
  
//     // const orderdata = userdata.order.reverse();
//     // console.log(orderdata)

//     return res.status(200).json({
//       success: true,
//       message: 'Order fetched successfully',
//       data: userdata, // Return the order data in the response
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: 'Error occurred',
//     });
//   }
// });
  



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


  
  
  

