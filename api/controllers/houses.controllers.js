import asyncHandler from 'express-async-handler'
import House from '../models/houses.models.js'

//@desc LIST ALL HOUSES
//@route GET /api/houses
//@access private 
const listAllHouses = asyncHandler(async (req, res) => {
    const houses = await House.find({}).populate('habitants', 'name email');
    res.send(houses)
});

//@desc GET A HOUSE BY ID
//@route GET /api/houses/:id
//@access private 
const getHouse = asyncHandler(async (req, res) => {
    const houseId = req.params.id
    const houses = await House.find({ _id: houseId }).populate('habitants', 'name email');
    res.send(houses)
});

//@desc ADD NEW HOUSE
//@route POST /api/houses
//@access private ADMIN
const addHouse = asyncHandler(async (req, res) => {
    const { address, number, habitants } = req.body;
    const existHouse = await House.findOne({ number });
    if(!req.user.isAdmin){
        res.status(401);
        throw new Error('Only for Admin Users')
    }

    if(existHouse){
        res.status(400);
        throw new Error('House already exists')
    }

    const house = await House.create({
        address,
        number,
        habitants
    })

    if(house){
        res.status(201);
        res.send(house);
    }else{
        res.status(400);
        throw new Error('Invalid house data')
    }
});

//@desc ADD HABITANTS TO HOUSE
//@route PUT /api/houses/:id/habitant
//@access private 
const addHabitant = asyncHandler(async (req, res) => {
    const houseId = req.params.id;
    const { userId } = req.body;

    const exitUser = await House.findOne({ _id: houseId, habitants: userId });
    if(exitUser){
        res.status(400);
        throw new Error(`User ${userId} already exist in the house`)
    }

    const houseToUpdate = await House.findByIdAndUpdate(
        houseId, 
        { $push: { habitants: userId } },
        { new: true, useFindAndModify: false }
    );
    if(houseToUpdate){
        res.status(200);
        res.send(houseToUpdate);
    }else{
        res.status(400);
        throw new Error('Invalid data')
    }
});

//@desc DELETE A HOUSE
//@route DELETE /api/houses/:id
//@access private ADMIN
const deleteHouse = asyncHandler(async (req, res) => {
    const houseId = req.params.id;

    if(!req.user.isAdmin){
        res.status(401);
        throw new Error('Only for Admin Users')
    }

    const { deletedCount } = await House.deleteOne({ _id: houseId });
    if(deletedCount === 1){
        res.status(200);
        res.json(`House deleted: ${houseId}`);
    }else{
        res.status(400);
        throw new Error('Invalid id');
    }
        
});

//@desc DELETE A HABITANT
//@route DELETE /api/houses/:id/habitants
//@access private 
const deleteHabitant = asyncHandler( async (req, res) => {
    const houseId = req.params.id;
    const { habitantId } = req.body;
    const newHouse = await House.findByIdAndUpdate(
        houseId, 
        { $pull: { habitants: habitantId } },
        { new: true, useFindAndModify: false }
    );
    if(newHouse){
        res.status(200);
        res.send(newHouse);
    }else{
        res.status(400);
        throw new Error('Invalid house id');
    }
    
});



export { listAllHouses, addHouse, addHabitant, deleteHouse, getHouse, deleteHabitant }