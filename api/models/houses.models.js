import mongoose from 'mongoose'

const houseSchema = mongoose.Schema(
    {
        address: String,
        number: Number,
        habitants: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        ]
    },
    { timestamps: true }
)

const House = mongoose.model('House', houseSchema)

export default House