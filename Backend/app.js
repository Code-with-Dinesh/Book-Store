const express = require("express")
const app =  express();
const conn =  require('./Connection')
require("dotenv").config()

app.listen(process.env.PORT,()=>{
    console.log(`Server is Starting on the port number ${process.env.PORT}`)
})
conn()