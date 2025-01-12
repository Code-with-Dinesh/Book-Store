const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {

        });
        console.log('Connected to the Database Successfully');
    } catch (error) {
        console.error(`Error While Database Connection: ${error.message}`);
    }
};

module.exports = connectToDatabase;
