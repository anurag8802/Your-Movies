# Netflix Clone Backend

A robust and secure backend API for the Netflix clone application, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with secure cookie handling
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against abuse with configurable rate limits
- **Security**: Helmet.js for security headers, CORS protection
- **Error Handling**: Centralized error handling with detailed logging
- **Logging**: Winston logger with file and console output
- **Performance**: Compression middleware for faster responses
- **Database**: MongoDB with Mongoose ODM and optimized schemas

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd netflix-project/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   PORT=8080
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/netflix-clone
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/logout` - Logout user

### User Profile
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile
- `PUT /api/v1/user/change-password` - Change password

### Health Check
- `GET /health` - Server health status

## 🔒 Security Features

- **Password Hashing**: bcryptjs with configurable salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive request validation
- **Security Headers**: Helmet.js for enhanced security
- **CORS Protection**: Configurable cross-origin resource sharing

## 📊 Logging

The application uses Winston for logging with the following features:
- Console logging with colors
- File logging for errors and combined logs
- Request logging for all API calls
- Structured logging with timestamps

## 🏗️ Project Structure

```
backend/
├── controllers/          # Route controllers
│   └── user.js          # User authentication logic
├── middleware/          # Custom middleware
│   ├── auth.js          # Authentication middleware
│   ├── errorHandler.js  # Error handling & logging
│   ├── rateLimiter.js   # Rate limiting
│   └── validation.js    # Input validation
├── models/              # Database models
│   └── userModel.js     # User schema
├── routes/              # API routes
│   └── userRoute.js     # User routes
├── utils/               # Utility functions
│   └── database.js      # Database connection
├── logs/                # Log files (auto-created)
├── index.js             # Main server file
└── package.json         # Dependencies
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8080 |
| `NODE_ENV` | Environment mode | development |
| `MONGO_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |

### Rate Limiting

- **General**: 100 requests per 15 minutes
- **Authentication**: 5 requests per 15 minutes
- **Search**: 30 requests per minute

## 🚀 Performance Optimizations

- **Compression**: Gzip compression for responses
- **Database Indexing**: Optimized MongoDB indexes
- **Caching**: HTTP caching headers
- **Connection Pooling**: MongoDB connection optimization

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

For support and questions, please open an issue in the repository. 