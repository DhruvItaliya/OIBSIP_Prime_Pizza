import { getUserIdFromToken } from "../utils/jwtProvider.js";
import { findUserById } from '../services/userService.js';
const auth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const userId = await getUserIdFromToken(token);
        const user = await findUserById(userId._id);
        req.user = user;
        console.log("Authenticataion successfull");
    } catch (error) {
        console.log("Error in Auth middleware");
        return res.status(500).json({success:false,error: error.message })
    }
    next();
}

export default auth;