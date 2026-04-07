# Memory - Social Posts Application

A full-stack web application for creating, sharing, and discovering memory posts. Users can create posts, like them, search by title or tags, and manage their memories in one place.

## Features

- **User Authentication**: Secure sign-up and sign-in with JWT-based authentication
- **Create Posts**: Share your memories with title, message, tags, and images
- **Like Posts**: Like and unlike posts from other users
- **Search & Filter**: Search posts by title or filter by multiple tags
- **Pagination**: Browse posts with smooth pagination
- **User Profiles**: View user information and posted memories
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **React 18** - UI library
- **Redux** - State management
- **Axios** - HTTP client
- **Material-UI (MUI)** - Component library
- **React Router DOM** - Client-side routing
- **React OAuth Google** - Google authentication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Memory
```

### 2. Install backend dependencies
```bash
cd server
npm install
```

### 3. Install frontend dependencies
```bash
cd ../client
npm install
```

## Environment Setup

### Backend (.env)
Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
GOOGLE_AUTH_CLIENT_ID=<your-google-auth-client-id>
```

### Frontend (optional configuration)
The frontend is configured to connect to `http://localhost:5000` by default (see `client/package.json` proxy setting).

## Running the Application

### Start Backend
```bash
cd server
npm start
```
The backend will run on `http://localhost:5000`

### Start Frontend
In a new terminal:
```bash
cd client
npm start
```
The frontend will open at `http://localhost:3000`

## Project Structure

```
Memory/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── actions/          # Redux actions
│   │   ├── api/              # API calls
│   │   ├── components/       # React components
│   │   ├── constants/        # App constants
│   │   ├── images/           # Images and assets
│   │   ├── reducers/         # Redux reducers
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.js
│   └── package.json
├── server/
│   ├── controllers/          # Route handlers
│   ├── middleware/           # Custom middleware
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API routes
│   ├── index.js              # Server entry point
│   └── package.json
└── README.md                 # This file
```

## API Endpoints

### Posts
- `GET /posts` - Get all posts (with pagination)
- `GET /posts/search?searchQuery=&tags=` - Search posts by title or tags
- `GET /posts/:id` - Get a specific post
- `POST /posts` - Create a new post (requires auth)
- `PATCH /posts/:id` - Update a post (requires auth)
- `DELETE /posts/:id` - Delete a post (requires auth)
- `PATCH /posts/:id/likePost` - Like/unlike a post (requires auth)

### Users
- `POST /user/signin` - Sign in with email and password
- `POST /user/signup` - Create a new account

## Usage

1. **Sign Up**: Create an account with email and password or sign in with Google
2. **Create Post**: Click the form area to create a new post with title, message, tags, and image
3. **Discover Posts**: Browse posts on the home page with pagination
4. **Search**: Use the search bar to find posts by title or tags
5. **Like Posts**: Click the heart icon to like/unlike posts
6. **Sign Out**: Log out of your account securely

## Available Scripts

### Backend
```bash
npm start     # Start server with nodemon
```

### Frontend
```bash
npm start     # Start development server
npm run build # Build for production
npm test      # Run tests
```

Made by the Mayank Verma