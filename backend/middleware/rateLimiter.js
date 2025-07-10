import rateLimit from 'express-rate-limit';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// General rate limiter - more lenient for development
export const generalLimiter = isDevelopment ? (req, res, next) => next() : rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute (reduced from 15 minutes)
  max: 1000, // limit each IP to 1000 requests per windowMs (increased from 100)
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter - more lenient for development
export const authLimiter = isDevelopment ? (req, res, next) => next() : rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute (reduced from 15 minutes)
  max: 20, // limit each IP to 20 requests per windowMs (increased from 5)
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Search rate limiter - more lenient for development
export const searchLimiter = isDevelopment ? (req, res, next) => next() : rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute (reduced from 1 minute)
  max: 100, // limit each IP to 100 requests per windowMs (increased from 30)
  message: {
    success: false,
    message: 'Too many search requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
}); 