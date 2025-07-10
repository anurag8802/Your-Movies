import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Full name must be at least 2 characters'],
        maxlength: [50, 'Full name cannot exceed 50 characters'],
        match: [/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Don't include password in queries by default
    },
    avatar: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for user's display name
userSchema.virtual('displayName').get(function() {
    return this.fullName;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcryptjs.genSalt(12);
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

// Instance method to check if account is locked
userSchema.methods.isLocked = function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Static method to increment login attempts
userSchema.statics.incLoginAttempts = async function(email) {
    const user = await this.findOne({ email });
    if (!user) return;
    
    if (user.lockUntil && user.lockUntil < Date.now()) {
        await this.updateOne(
            { email },
            { $unset: { lockUntil: 1 }, $set: { loginAttempts: 1 } }
        );
    } else {
        const updates = { $inc: { loginAttempts: 1 } };
        if (user.loginAttempts + 1 >= 5 && !user.isLocked()) {
            updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
        }
        await this.updateOne({ email }, updates);
    }
};

export const User = mongoose.model("User", userSchema);