import express from 'express'
import dotenv from 'dotenv'
import connectDB from './api/config/database.js'

import userRoutes from './api/routes/users.routes.js'

dotenv.config();
connectDB();
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send({"message": "Visistant registration API..."})
});

//ROUTES
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, 
    console.log(`Server running as ${process.env.MODE} in ${PORT}`))
