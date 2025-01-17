const express =  require('express')
const router = express.Router()
const user =  require('../Modals/user')
const Book =  require("../Modals/book")
const Authenticationuser = require('../Auth/auth')

module.exports = router.post('/createbook',Authenticationuser,async(req,res)=>{
    try {
        const {url,title,price,author,desc,lang} = req.body;
        const id =  req.user.id
        const existencuser = await user.findById(id)
        if(existencuser.role !== 'admin'){
          return res.status(400).json({
                status:false,
                message:'Only Admin can add the Books'
            })
        }
        const createdbook =  await Book.create(
            {
                url,
                title,
                price,
                desc,
                author,
                lang
            }
        )
        return res.status(200).json({
            success:true,
            message:'Book Added Successfully',
            data:createdbook
        })
    } catch (error) {
        console.log(`Error while Creating The Book by Admin ${error}`)
    }
})

// Delete route for admin 

module.exports =  router.delete('/delete',Authenticationuser,async(req,res)=>{
    try {
        const {id} =  req.body; // this is the book id
        const userid =  req.user.id
        const userrole = await user.findById(userid)
        if(userrole.role !== 'admin'){
            return res.status(400).json({
                success:false,
                message:'Only can Admin delete the Book'
            })
        }
        const deletebook = await Book.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:'Book is Delete Successfully',
            data:deletebook,
        })
        
        
    } catch (error) {
        console.log(`Error while Delete the Book ${error}`)
    }
})

// update route

module.exports = router.put('/updatebook',Authenticationuser,async(req,res)=>{
    try {
        const {id,title,author,desc,lang,price} = req.body;
        const userid  = req.user.id
        const userrole = await user.findById(userid)
        if(userrole.role !== 'admin'){
          return  res.status(400).json({
                success:false,
                message:'Only Admin can update the Book Information'
            })
        }
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, desc, lang, price },
            { new: true } 
        );
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        res.status(200).json({
            success:true,
            message:'Book is Update successfully',
            data:updatedBook
        })
    } catch (error) {
        console.log(`Error while Update the book ${error}`)
    }

})

//Show all books at ui

module.exports = router.get('/allbooks',async(req,res)=>{
    try {
        const allbooks = await Book.find().sort({createdAt:-1});
        res.status(200).json({
            success:true,
            message:'Books Fetched Successfully',
            data:allbooks
        })
    } catch (error) {
        console.log(`Error while Fetching the Book form the Database ${error}`)
    }
})

// recent book route

module.exports = router.get('/recentbook',async(req,res)=>{
    try {
        const recentbook = await Book.find().sort({created:-1}).limit(4)
        res.status(200).json({
            success:true,
            message:'Fetching the recent book successfully',
            data:recentbook,
        })

    } catch (error) {
        console.log(`Error at Recent book ${error}`)
    }
})

// Particular Book Details
module.exports = router.get('/book/:id',async(req,res)=>{
  try {
    const {id} = req.params;
    const bookdetail = await Book.findById(id)
    if(!bookdetail){
        return res.status(400).json({
            success:false,
            message:'No Book Availabe'
        })
    }
    res.status(200).json({
        success:true,
        message:'Detail for you particular Book',
        data:bookdetail,
    })
  } catch (error) {
    console.log(`Error while Fetching the particular book ${error}`)
  }
})