import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './api/config/database.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
connectDB()

app.use('/', (req, res) => {
    res.json({"message": "Visistant registration API..."})
});

const PORT = process.env.PORT || 4000

app.listen(PORT, 
    console.log(`Server running in ${PORT}`))
