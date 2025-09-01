# Your Movies

## 🚀 Live Demo
Check out the project here: https://extraordinary-ganache-3c2e16.netlify.app/



A full-stack Netflix clone built with React.js, Node.js, and Express.js. This project replicates core Netflix functionalities including user authentication, movie browsing, search, favorites, and subscription management.

## Features

- 🔐 User Authentication & Authorization
- 🎬 Browse Movies by Categories
- 🔍 Search Functionality
- ❤️ Add to Favorites
- 📺 Continue Watching List
- 💳 Subscription Management
- 🎯 Personalized Movie Recommendations
- 📱 Responsive Design

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Tailwind CSS for styling
- Custom hooks for API integration
- Responsive UI components

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Rate Limiting
- Error Handling Middleware

## Project Structure

```
├── backend/              # Backend server code
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
│
├── netflix/             # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── redux/      # Redux store and slices
│   │   └── utils/      # Utility functions
│   └── public/         # Static files
```

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/anurag8802/netflix.git
cd netflix
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../netflix
npm install
```

3. Set up environment variables
Create `.env` files in both backend and frontend directories with necessary configurations.

4. Run the application
```bash
# Start backend server
cd backend
npm start

# Start frontend application
cd ../netflix
npm start
```

## Features in Detail

### Movie Categories
- Now Playing
- Popular Movies
- Top Rated
- Action
- Crime
- Horror
- Romance
- Marvel Movies
- Family
- Thriller
- Top 10 Hindi Movies
- Kids Content

### User Features
- User Profile Management
- Watch History
- Favorites List
- Continue Watching
- Subscription Management
- Help Center Access

## Contributing

Feel free to contribute to this project by creating issues or submitting pull requests. Please follow the existing code style and add unit tests for any new features.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This project is created for learning purposes and is not affiliated with Netflix. All movie data is sourced from public APIs.
