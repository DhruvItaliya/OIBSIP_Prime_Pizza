import User from "../models/user.model.js";
import Address from "../models/address.model.js";
import { getUserIdFromToken } from '../utils/jwtProvider.js';
import sendMail from "../utils/email.js";
import OTP from '../models/otpSchema.model.js';
import crypto from 'crypto';

export const createUser = async (req) => {
    try {

        const { name, role, email, otp, password } = req.body;

        if (!name || !role || !email || !otp || !password) {
            throw new Error("Please fill the all details");
        }

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error("User with this email already Exist");
        }

        const otpUser = await OTP.findOne({ email, expiryTime: { $gte: Date.now() } }).sort({createdAt:-1});

        console.log(otpUser);
        if (otpUser.otpValue != otp) {
            throw new Error("Invalid OTP!");
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
        // const message = `We have received a password reset request. Please use belove link to reset password\n\n ${resetURL}\n\n This reset password link will be valid for 10 minutes.`
        const message = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                <tr>
                    <td>
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4;">
                            <tr>
                                <td style="text-align: center; padding: 10px 0;">
                                    <h2 style="color: #333333;">Password Reset Request</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    <p style="color: #333333;">We have received a password reset request. Please use the link below to reset your password:</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 20px 0;">
                                    <a href="${resetURL}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    <p style="color: #333333;">This reset password link will be valid for 10 minutes.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0;">
                                    <p style="color: #333333;">If you did not request this password reset, please ignore this email.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 20px 0; text-align: center;">
                                    <p style="color: #777777;">&copy; 2024 Prime Pizza. All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `
        
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

export const addAddress = async (address, user) => {
    try {
        console.log(address);
        const { fullName, streetAddress, city, state, postalCode } = address;

        const addedAddress = await Address({
            fullName,
            streetAddress,
            city,
            state,
            postalCode
        });

        addedAddress.save();
        console.log(user);
        user.addresses.push(addedAddress._id);
        user.save();
    } catch (error) {

    }
}



