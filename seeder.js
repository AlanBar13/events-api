import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './api/config/database.js'

import users from './api/data/users.js'
import houses from './api/data/houses.js'

import User from './api/models/users.models.js'
import Event from './api/models/events.models.js'
import House from './api/models/houses.models.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await House.deleteMany()
        await Event.deleteMany()

        const createdUsers = await User.insertMany(users);
        const newHouses = houses.map((h, index) => {
            return {...h, habitants: [createdUsers[index + 1]._id]}
        })
        await House.insertMany(newHouses)
        console.log('Data Imported')
        process.exit()
    }catch(error){
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await House.deleteMany()
        await Event.deleteMany()
        console.log('Data Destroyed')
        process.exit()
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === "-d"){
    destroyData()
}else{
    importData()
}