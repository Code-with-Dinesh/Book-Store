const jwt = require('jsonwebtoken')

const Authenticationuser = (req,res,next)=>{
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '')
    if(!token){
        res.status(400).json({
            success:false,
            message:'Unauthorized, no token provided you must be login first'
        })
    }
    try {
        const decode = jwt.verify(token,'mykey')
        req.user = decode;
        next();
    } catch (error) {
        console.log(`Error while Authentication user ${error}`)
    }
}

module.exports = Authenticationuser;