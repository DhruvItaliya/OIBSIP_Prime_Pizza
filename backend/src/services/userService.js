import User from "../models/user.model.js";
import { getUserIdFromToken } from '../utils/jwtProvider.js';
import sendMail from "../utils/email.js";
import crypto from 'crypto';

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

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) throw new Error("User not found");
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate('addresses');
        if (!user) throw new Error("User not found with id : ", userId);
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const findUserProfileByJwt = async (jwt) => {
    try {
        const userId = getUserIdFromToken(jwt);
        // const user = await this.findUserById(userId);
        const user = await findUserById(userId);
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const findAllUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const forgotPassword = async (req, email) => {
    try {
        const user = await getUserByEmail(email);
        const resetToken = user.createResetPasswordToken();
        await user.save();

        const resetURL = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;
        const message = `We have received a password reset request. Please use belove link to reset password\n\n ${resetURL}\n\n This reset password link will be valid for 10 minutes.`
        try {
            await sendMail({
                email: user.email,
                subject: "Reset Password",
                message: message
            });
        }
        catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined;
            user.save();
            console.log(error.message);
            throw new Error("Password reset rejected");
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const resetPassword = async (token, password) => {
    try {
        const hashed_token = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({ passwordResetToken: hashed_token, passwordResetTokenExpires: { $gt: Date.now() } });
        if (!user) {
            throw new Error("Invalid Token! or Token Expired");
        }

        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.save();
    }
    catch (error) {
        throw new Error(error.message);
    }
}



