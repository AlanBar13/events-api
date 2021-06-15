import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', (req, res) => {
    res.json({"message": "Visistant registration API..."})
});

const PORT = process.env.PORT || 4000

app.listen(PORT, 
    console.log(`Server running in ${PORT}`))
