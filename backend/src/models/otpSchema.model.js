import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otpValue: {
        type: String,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    otpSecret: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OTP = new  mongoose.model('OTP', otpSchema);

export default OTP;
