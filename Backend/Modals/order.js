const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:'book'
    },
    status:{
        type:String,
        default:'order placed',
        enum:['order placed','Delivered','cancel','out of Delivery']
    }
},{timestamps:true})

const order =  mongoose.model('order',orderSchema)
module.exports = order