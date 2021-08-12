import mongoose from 'mongoose'

const noticesSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    postedAt: { type: Date, required: true },
    comments: {
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    type: { type: String, required: true }
},
    { timestamps: true }
)

const Notices = mongoose.model('Notices', noticesSchema)

export default Notices