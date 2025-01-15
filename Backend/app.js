const express = require("express");
const app = express();
const conn = require('./Connection');
const router = require('./Routes/route');
const adminroute =  require('./Routes/admin')
const favouite = require('./Routes/favourate')
const cookieParser = require("cookie-parser");

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cookieParser()); 

// Routes
app.use('/api/v1', router);
app.use('/api/v1',router)
app.use('/api/v1',router)
app.use('/api/v1',adminroute)
app.use('/api/v1',favouite)

// Start the Server
app.listen(process.env.PORT, () => {
    console.log(`Server is starting on port number ${process.env.PORT}`);
});

app.get("/",(req,res)=>{
    res.send('home')
})
// Initialize Database Connection
conn();
