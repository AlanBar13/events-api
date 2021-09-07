import asyncHandler from 'express-async-handler';
import User from "../models/users.models.js";
import House from "../models/houses.models.js";
import generateToken from '../utils/generateToken.js'
import encrypt from '../utils/encryptPwd.js'

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
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
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
        const house = await House.find({ habitants: user._id })
        if(house){
            res.status(200)
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                house: house[0],
                token: generateToken(user._id)
            })
        }else{
            res.status(200)
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }
    }else{
        res.status(401);
        throw new Error('Wrong email or password')
    }
});

//@desc DELETE USER
//@route DELETE /api/users/:id
//@access private ADMIN
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    if(!req.user.isAdmin){
        res.status(401);
        throw new Error('Only for Admin Users')
    }

    const { deletedCount } = await User.deleteOne({ _id: userId });
    if(deletedCount === 1){
        res.status(200);
        res.json({ deleted: true, userId });
    }else{
        res.status(400);
        throw new Error('Invalid user id')
    }
});


//@desc RESET PASSWORD
//@route POST /api/users/:id/resetpwd
//@access private ADMIN
const resetPwd = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const {password} = req.body;

    if(!req.user.isAdmin){
        res.status(401);
        throw new Error('Only for Admin Users')
    }

    const user = await User.findByIdAndUpdate(userId, {
        password: await encrypt(password)
    });
    if(user){
        res.status(202);
        res.json({message: "Password reset"})
    }else{
        res.status(400);
        throw new Error('Invalid id')
    }

})

export { registerUser, listAllUsers, authUser, deleteUser, getUser, resetPwd }
