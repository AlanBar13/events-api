import mongoose from 'mongoose'

const houseSchema = mongoose.Schema({
    address: String,
    number: Number,
    habitants: [
        { type: mongoose.Schema.Types.ObjectId }
    ]
},
{timestamps: true })

const House = mongoose.Model('House', houseSchema)

export default House