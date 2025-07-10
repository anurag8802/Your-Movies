import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/errorHandler.js";
import logger from "../middleware/errorHandler.js";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);
    
    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            message: `Welcome back ${user.fullName}`,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                avatar: user.avatar,
                createdAt: user.createdAt
            },
            token
        });
};

export const Register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('Email already registered', 400);
        }

        // Create user
        const user = await User.create({
            fullName,
            email,
            password
        });

        logger.info(`New user registered: ${email}`);

        sendTokenResponse(user, 201, res);
    } catch (error) {
        next(error);
    }
};

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists and include password for comparison
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        // Check if account is locked
        if (user.isLocked()) {
            throw new AppError('Account is temporarily locked due to too many failed attempts', 423);
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            // Increment login attempts
            await User.incLoginAttempts(email);
            throw new AppError('Invalid credentials', 401);
        }

        // Reset login attempts on successful login
        if (user.loginAttempts > 0) {
            await User.updateOne(
                { email },
                { 
                    $set: { 
                        loginAttempts: 0, 
                        lockUntil: null,
                        lastLogin: new Date()
                    } 
                }
            );
        }

        logger.info(`User logged in: ${email}`);

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

export const Logout = async (req, res, next) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000), // 10 seconds
            httpOnly: true
        });

        logger.info(`User logged out: ${req.user?.email || 'Unknown'}`);

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const GetProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                avatar: user.avatar,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        next(error);
    }
};

export const UpdateProfile = async (req, res, next) => {
    try {
        const { fullName, avatar } = req.body;
        const updateFields = {};

        if (fullName) updateFields.fullName = fullName;
        if (avatar) updateFields.avatar = avatar;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateFields,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                avatar: user.avatar,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};

export const ChangePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id).select('+password');
        
        // Check current password
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            throw new AppError('Current password is incorrect', 401);
        }

        // Update password
        user.password = newPassword;
        await user.save();

        logger.info(`Password changed for user: ${user.email}`);

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const ForgotPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            throw new AppError('Email and new password are required', 400);
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError('User not found with this email', 404);
        }

        // Update password (the pre-save middleware will hash it)
        user.password = newPassword;
        await user.save();

        logger.info(`Password reset for user: ${email}`);

        res.status(200).json({
            success: true,
            message: 'Password changed successfully. You can now login with your new password.'
        });
    } catch (error) {
        next(error);
    }
};