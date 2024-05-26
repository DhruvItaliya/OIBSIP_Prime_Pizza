import * as userService from "../services/userService.js";
import { generateToken } from "../utils/jwtProvider.js";

export const signup = async (req, res) => {
    try {
        const user = await userService.createUser(req);
        // await cartService.createCart(user);
        return res.status(201).json({ success: true, user })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) return res.status(401).json({ success: false, error: "Email or password invalid" });
        const token = await generateToken(user._id);
        const maxAge = 3600 * 1000;
        const options = {
            httpOnly: true,
            maxAge: maxAge
        }
        res.status(200).cookie('token', token, options).json({ success: true, user, auth_token: token });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        await userService.forgotPassword(req,email);
        res.status(200).json({ success: true,message:"Password reset link send to the user email" });
    }
    catch (error) {
        console.log("Error in forgot password");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;
        if(!password || !token) throw new Error("Provide password and token")
        await userService.resetPassword(token,password);
        res.status(200).json({ success: true });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
}