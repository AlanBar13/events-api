import dotenv from 'dotenv'
import connectDB from './api/config/database.js'

import users from './api/data/users.js'
import houses from './api/data/houses.js'
import events from './api/data/events.js'
import notices from './api/data/notices.js'

import User from './api/models/users.models.js'
import Event from './api/models/events.models.js'
import House from './api/models/houses.models.js'
import Notice from './api/models/notices.model.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await House.deleteMany()
        await Event.deleteMany()
        await Notice.deleteMany()

        const createdUsers = await User.insertMany(users);
        const newHouses = houses.map((h, index) => {
            return {...h, habitants: [createdUsers[index + 1]._id]}
        })
        const createdHouses = await House.insertMany(newHouses)
        const newEvents = events.map((e, index) => {
            return {...e, user: createdUsers[index + 1]._id, house: createdHouses[index]._id}
        })
        await Event.insertMany(newEvents)
        const newNotices = notices.map((n, index) => {
            return {...n, comments: [ {text: `Comment notice ${index + 1}`, author: createdUsers[index + 1]._id}]}
        })
        await Notice.insertMany(newNotices)
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
        await Notice.deleteMany()
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