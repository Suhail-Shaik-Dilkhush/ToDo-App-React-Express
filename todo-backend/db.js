const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongo DB connected successfully")
    }
    catch (err) {
        console.error("Facing issues while connecting to Mongo DB", err.message)
    }
}

module.exports = connectDB