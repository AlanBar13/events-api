import asyncHandler from 'express-async-handler';
import User from "../models/users.models.js";

//@desc REGISTER NEW USER
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User exist");
    }

    const user = await User.create({
        name,
        email,
        password
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
    const users = await User.find({});
    res.send(users)
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


export { registerUser, listAllUsers, authUser }
