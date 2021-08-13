import mongoose from 'mongoose'

const eventsSchema = mongoose.Schema(
    {
        title: {type: String, required: true },
        eventStart: {type: Date, required: true },
        eventEnd: {type: Date, required: true },
        visitInfo: {
            name: {type: String, required: true },
            vehicleId: {type: String, required: true },
        },
        user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        house: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'House' },
        visitArrivedTime: {type: Date },
        visitLeftTime: {type: Date }
    },
    { timestamps: true }
    );

const Event = mongoose.model('Event', eventsSchema);

export default Event;