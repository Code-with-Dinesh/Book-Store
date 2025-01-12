const mongoose =  require('mongoose')

const bookSchema = mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    lang:{
        type:String,
        required:true,
    }

},{timestamps:true})

const book = mongoose.model('book',bookSchema)
module.exports = book
