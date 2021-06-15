import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

let mongo_uri;
if(process.env.MODE === 'dev'){
    mongo_uri = process.env.MONGO_URI_DEV
}else{
    mongo_uri = process.env.MONGO_URI
}

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(mongo_uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB connected ${conn.connection.host}`)
    }catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;