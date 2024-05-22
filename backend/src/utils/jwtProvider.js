import jwt from 'jsonwebtoken';

export const generateToken = async (userId)=>{
    const token= await jwt.sign({_id:userId},process.env.SECRET_KEY,{
        expiresIn:"48h"
    })
    return token
}

export const getUserIdFromToken=async(token)=>{
    console.log(token);
    const decodedToken = await jwt.verify(token,process.env.SECRET_KEY);
    return decodedToken;
}
