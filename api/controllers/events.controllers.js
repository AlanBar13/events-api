import ascynHandler from 'express-async-handler'
import Event from '../models/events.models.js'

//@desc LIST ALL EVENTS
//@route GET /api/events
//@access public
const listEvents = ascynHandler(async (req, res) => {
    const events = await Event.find({}).populate('house')
        .populate({
            path: 'house',
            select: 'address number', 
            populate: { path: 'habitants', select: 'name email' }
        });

    res.status(200);
    res.send(events);
});

//@desc GET AN EVENT
//@route GET /api/events/:id
//@access public
const getEvent = ascynHandler( async (req, res) => {
    const eventId = req.params.id;

    const event = await Event.findById(eventId)
        .populate({ 
            path: 'house',
            select: 'address number', 
            populate: { path: 'habitants', select: 'name email' }
        });

    if(event){
        res.status(200);
        res.send(event);
    }else{
        res.status(400);
        throw new Error('Invalid id')
    }

});

//@desc ADD NEW EVENT
//@route POST /api/events
//@access private
const addEvent = ascynHandler( async (req, res) => {
    const { 
        title, 
        eventStart, 
        eventEnd, 
        visitInfo, 
        house,
        visitArrivedTime,
        visitLeftTime } = req.body;
    
    if(title === "" || visitInfo.name === "" || visitInfo.vehicleId === ""){
        res.status(400)
        throw new Error('Title, visit name or license plate cannot be blank')
    }
    
    const newEvent = await Event.create({
        title,
        eventStart: eventStart || new Date(),
        eventEnd: eventEnd || new Date(),
        visitInfo,
        house,
        visitArrivedTime: visitArrivedTime || new Date(),
        visitLeftTime: visitLeftTime || new Date()
    });

    if(newEvent){
        res.status(200);
        res.send(newEvent)
    }else{
        res.status(400);
        throw new Error('Invalid data')
    }
});

//@desc DELETE EVENT
//@route DELETE /api/events/:id
//@access private
const deleteEvent = ascynHandler( async (req, res) => {
    const eventId = req.params.id;

    const del = await Event.findByIdAndDelete(eventId);
    if(del){
        res.status(200);
        res.json({deleted: true, eventId})
    }else{
        res.status(400);
        throw new Event('Invalid id')
    }
});

export { listEvents, addEvent, getEvent, deleteEvent };