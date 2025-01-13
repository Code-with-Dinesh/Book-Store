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

