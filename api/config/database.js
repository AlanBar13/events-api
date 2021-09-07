import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from '../utils/logger.js'

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
        console.log(`[DB service] MongoDB connected to ${conn.connection.host}`)
    }catch(error){
        logger.error('[DB service] error connecting to DB')
        process.exit(1)
    }
}

export default connectDB;