import * as userService from "../services/userService.js";
import { generateToken } from "../utils/jwtProvider.js";
import * as otpService from "../services/otpService.js";
import User from "../models/user.model.js";

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
        if (!isPasswordMatched) return res.status(400).json({ success: false, error: "Email or password invalid" });
        const token = await generateToken(user._id);
        const maxAge = 3600 * 1000;
        const options = {
            httpOnly: true,
            maxAge: maxAge
        }
        console.log(token);
        res.status(200).cookie('token', token, options).json({ success: true, user, auth_token: token });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const getOTP = async (req, res) => {
    try {
        const otpDoc = await otpService.getOtp(req);
        res.status(200).json({ success: true, otpDoc });
    }
    catch (error) {
        console.log("Error in getOTP");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server Error" });
        }
    }
}

export const logout = async (req, res,) => {
    console.log("From backend");
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logged Out Successfully"
    })
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        await userService.forgotPassword(req, email);
        res.status(200).json({ success: true, message: "Password reset link send to the user email" });
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
        if (!password || !token) throw new Error("Provide password and token")
        await userService.resetPassword(token, password);
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

export const fetchUserAddresses = async (req, res) => {
    try {
        const { user } = req;
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, users });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const { user } = req;
        console.log(address);
        const addedAddress = await userService.addAddress(address, user);
        res.status(201).json({ success: true, address: addedAddress });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}