# Smart Transportation System

A modern web application that seamlessly connects metro and railway systems, providing real-time tracking, efficient route planning, and a user-friendly interface for urban commuters.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Overview](#api-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Real-Time Tracking:** Effortlessly connects metro and railway systems, ensuring a smooth and hassle-free commute with unified ticketing and scheduling.
- **Seamless Connectivity:** Stay informed with real-time updates on metro and train schedules and delays.
- **Efficient Route Planning:** Simplifies your commute by connecting railways with metro systems, helping you travel faster and more efficiently.
- **User-Friendly Interface:** Modern, intuitive, and responsive design for the best user experience.
- **Contact & Support:** Built-in contact form for user feedback and support.
- **Favorites & History:** Save favorite routes and view search history (for registered users).

---

## Screenshots

> Place your screenshots in `frontend/assets/` and reference them as below.

### Why Choose Our Smart Transportation System?
![Why Choose](./frontend/assets/why-choose.png)

### Route Search and Results
![Route Search](./frontend/assets/route-search.png)

### Find Your Route Page
![Find Route](./frontend/assets/find-route.png)

---

## Project Structure

```
smart-transportaion-system/
│
├── frontend/
│   ├── src/
│   │   ├── pages/         # Main pages (Home, AboutUs, Routes, etc.)
│   │   ├── components/    # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── assets/        # Images and static assets
│   │   └── ...            # Utilities, hooks, redux, etc.
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/       # Business logic for stations and users
│   ├── models/            # Mongoose models for MongoDB
│   ├── routes/            # Express route definitions
│   ├── utils/             # Helper functions (shortest path, JWT, etc.)
│   ├── index.js           # Entry point for Express server
│   └── package.json
│
└── README.md
```

---

## How It Works

1. **Input Your Journey Details:**  
   Enter your starting station and destination. The system gathers real-time data from metro and railway networks to suggest the fastest and most convenient routes.

2. **Receive Optimal Routes & Real-Time Updates:**  
   Get instant recommendations for your route based on the latest schedules, including real-time updates on train/metro timings, platform numbers, and delays.

3. **Enjoy a Seamless Journey:**  
   After booking, the system keeps you updated on any changes in real-time, ensuring a stress-free commute.

---

## Tech Stack

- **Frontend:** React, Chakra UI, Redux, React Router, Framer Motion, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), Redis, JWT, Nodemailer
- **Other:** Vite (frontend build), Helmet & XSS-Clean (security), Google OAuth

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Redis instance (for caching/session)
- (Optional) Google OAuth credentials for social login

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/smart-transportaion-system.git
cd smart-transportaion-system
```

#### 2. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory with your MongoDB, Redis, and JWT secrets.

#### 4. Run the Application

```bash
# Start backend
cd backend
npm run dev

# Start frontend (in a new terminal)
cd ../frontend
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:PORT` for the backend.

---

## API Overview

### User APIs

- `POST /user/register` - Register a new user
- `POST /user/login` - Login
- `GET /user/logout` - Logout
- `POST /user/forgot-password` - Password reset
- `POST /user/contact-us` - Send feedback/support message
- `POST /user/save-favourite-route` - Save a favorite route
- ...and more (see `backend/routes/userRoutes.js`)

### Station/Route APIs

- `POST /station/get-route` - Get the best route between two stations
- `GET /station/get-all-stations` - List all stations
- `GET /station/get-train-details` - Get train details
- ...and more (see `backend/routes/stationRoutes.js`)

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

**Note:**  
- For image references, save your screenshots as `why-choose.png`, `route-search.png`, and `find-route.png` in `frontend/assets/`.
- Update the API endpoints and features as your project evolves. 