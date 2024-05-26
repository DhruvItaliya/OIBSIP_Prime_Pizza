import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Schema for user 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    role: {
        type: String,
        enum: ['CUSTOMER', 'OWNER'],
        default: 'CUSTOMER'
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
}, { timestamps: true });

// hash password before save;
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// comparing password
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    console.log(resetToken);
    console.log(this.passwordResetToken);
    return resetToken;
}

const User = mongoose.model('User', userSchema);

export default User;