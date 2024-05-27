import User from '../models/user.model.js';
import OTP from "../models/otpSchema.model.js";
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';

export const getOtp = async (req) => {
    console.log("Hello from backend");
    try {
        const { email } = req.body;
        const isEmail = await User.findOne({ email });
        if (isEmail) {
            throw new Error("User already exist");
        }
        // Generate OTP
        const otpSecret = speakeasy.generateSecret().base32;
        const otp = speakeasy.totp({
            secret: otpSecret,
            step: 3600 // OTP is valid for 1 hour (3600 seconds)
        });

        // Calculate OTP expiry time
        const expiryTime = new Date();
        expiryTime.setTime(expiryTime.getTime() + 3600000); // 1 hour from now

        // Save OTP in the database
        const otpDoc = await OTP.create({ email, otpValue: otp, expiryTime, otpSecret });
        // Send OTP to user's email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'codewithdhruv333@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP Verification From Prime Pizza!',
            html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
      
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
      
                h2 {
                  text-align: center;
                }
      
                .otp-box {
                  background-color: #f0f0f0;
                  padding: 20px;
                  text-align: center;
                  font-size: 24px;
                  font-weight: bold;
                }
      
                p {
                  text-align: center;
                }

                .signature {
                  text-align: left;
                }
      
            </style>
        </head>

        
        <body>
            <div class="container">
                <h2>Your One-Time Password (OTP)</h2>
                <p>Use the following OTP to proceed:</p>
                <div class="otp-box">
                  ${otp}
                </div>
                <p>This OTP is valid for a single use and will expire shortly. Do not share it with anyone.</p>
                <p>If you didn't request this OTP, please ignore this email.</p>
                <p class="signature">Regards,<br>Prime Pizza</p>
            </div>
        </body>

        
        </html>
        `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Failed to send OTP");
                throw new Error("Failed to send OTP");
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return otpDoc;
    }
    catch (error) {
        console.log("Internal Server Error");
        throw new Error(error.message);
    }
};
