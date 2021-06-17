import asyncHandler from 'express-async-handler';
import User from "../models/users.models.js";

//@desc REGISTER NEW USER
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User exist");
    }

    const user = await User.create({
        name,
        email,
        password,
        isAdmin
    });

    if(user){
        res.status(200).json(user);
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc LIST ALL USERS
//@route GET /api/users
//@access public
const listAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.send(users);
});

//@desc GET A USERS
//@route GET /api/users/:id
//@access public
const getUser = asyncHandler( async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if(user){
        res.status(200);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(400);
        throw new Error('Invalid user id');
    }
});

//@desc AUTH USER
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))){
        res.status(200)
        //generate token and send it to a new user object
        res.send(user)
    }else{
        res.status(400)
        throw new Error('Wrong email or password')
    }
});

//@desc DELETE USER
//@route DELETE /api/users/:id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { deletedCount } = await User.deleteOne({ _id: userId });
    if(deletedCount === 1){
        res.status(200);
        res.json({ deleted: true, userId });
    }else{
        res.send(400);
        throw new Error('Invalid user id')
    }
});


export { registerUser, listAllUsers, authUser, deleteUser, getUser }
