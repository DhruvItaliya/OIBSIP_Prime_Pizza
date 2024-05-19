import jwt from 'jsonwebtoken';

export const generateToken = (userId)=>{
    const token=jwt.sign({userId},process.env.SECRET_KEY,{
        expiresIn:"48h"
    })
    return token
}

export const getUserIdFromToken=(token)=>{
    const decodedToken = jwt.verify(token,SECRET_KEY);
    return decodedToken;
}
