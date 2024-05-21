import User from "../models/user.model.js";
import {getUserIdFromToken} from '../utils/jwtProvider.js';

export const createUser = async (req) => {
    try {

        const { name, role, email, password } = req.body;

        if (!name || !role || !email || !password) {
            throw new Error("Please fill the all details");
        }

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error("User with this email already Exist");
        }

        const createdUser = await User.create({
            name, role, email, password
        });
        await createdUser.save();
        return createdUser;
    }
    catch (error) {
        console.log("Error in create user");
        throw new Error(error.message);
    }
} 

export const getUserByEmail = async(email)=>{
    try{
        const user = await User.findOne({email}).select('+password');
        if(!user) throw new Error("User not found");
        return user;
    }
    catch(error){
        throw new Error(error.message);
    }
}

export const findUserById = async(userId)=>{
    try{
        const user = await User.findById(userId).populate('addresses');
        if(!user) throw new Error("User not found with id : ",userId);
        return user;
    }
    catch(error){
        throw new Error(error.message);
    }
}

export const findUserProfileByJwt = async(jwt) =>{
    try{
        const userId = getUserIdFromToken(jwt);
        // const user = await this.findUserById(userId);
        const user = await findUserById(userId);
        return user;
    }   
    catch(error){
        throw new Error(error.message);
    }
}

export const findAllUsers = async()=>{
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}



