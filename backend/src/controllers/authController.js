import * as userService from "../services/userService.js";
import { generateToken } from "../utils/jwtProvider.js";

export const signup = async(req,res)=>{
    try{
        const user = await userService.createUser(req);
        // await cartService.createCart(user);
        return res.status(201).json({success:true,user})
    }
    catch(error){
        return res.status(500).json({success:false,error:error.message});
    }
}

export const signin = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userService.getUserByEmail(email);
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched) return res.status(401).json({success:false,error:"Email or password invalid"});
        const jwt = generateToken(user._id);
        return res.status(200).json({success:true,jwt});
    }
    catch(error){
        return res.status(500).json({success:false,error:error.message});
    }
}