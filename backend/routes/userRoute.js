import express from "express";
import { 
    Login, 
    Logout, 
    Register, 
    GetProfile, 
    UpdateProfile, 
    ChangePassword,
    ForgotPassword
} from "../controllers/user.js";
import { protect } from "../middleware/auth.js";
import { registerValidation, loginValidation } from "../middleware/validation.js";
import { authLimiter, generalLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public routes with rate limiting
router.post("/register", authLimiter, registerValidation, Register);
router.post("/login", authLimiter, loginValidation, Login);
router.post("/forgot-password", authLimiter, ForgotPassword);

// Protected routes
router.get("/logout", Logout);
router.get("/profile", protect, GetProfile);
router.put("/profile", protect, generalLimiter, UpdateProfile);
router.put("/change-password", protect, authLimiter, ChangePassword);

export default router;