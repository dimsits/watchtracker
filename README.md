# WatchTracker

**WatchTracker** is a modern web application that helps users organize and track their movie-watching journey. With features like adding movies to a watchlist, marking them as watched, and providing ratings or reviews, WatchTracker ensures a seamless and enjoyable experience for movie enthusiasts.

---

## Features

- **User Authentication**:
  - Secure registration and login using JWT-based authentication.
- **Watchlist Management**:
  - Add movies to a personalized watchlist.
  - Mark movies as watched or remove them.
- **Seen Movies**:
  - View a list of movies you’ve already watched.
  - Add or update reviews for watched movies.
- **Search**:
  - Search for movies and view detailed information.
- **Interactive Rating System**:
  - Rate movies using a 5-star system with dynamic updates.
- **Responsive Design**:
  - Fully responsive for both desktop and mobile devices.
- **Dark Mode**:
  - Switch between light and dark themes for an enhanced viewing experience.

---

## Tech Stack

### Frontend:
- **React**: Handles the user interface and dynamic interactions.
- **Zustand**: Lightweight state management.
- **Tailwind CSS**: Provides a modern, responsive design.

### Backend:
- **Node.js & Express**: Power the REST API endpoints.
- **Prisma ORM**: Simplifies database interactions.
- **MySQL**: The primary relational database.

### Authentication:
- **JWT**: Secures user sessions and API requests.

### Additional Tools:
- **Axios**: Facilitates communication between the frontend and backend.
- **Vite**: Used for fast frontend builds and development.

---

## Installation

### Prerequisites

- **Node.js**: Ensure Node.js (version 14 or higher) is installed.
- **MySQL**: Set up a MySQL database instance.
- **Environment Variables**:
  Create a `.env` file in the `backend` folder with the following variables:
  ```env
  DATABASE_URL=mysql://username:password@localhost:3306/watchtracker
  JWT_SECRET=your_secret_key
  PORT=5000
  ```

### Steps to Install

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/watchtracker.git
   cd watchtracker
   ```

2. **Install Dependencies**:
   Navigate to both `backend` and `frontend` directories and install dependencies:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set Up the Database**:
   Initialize the database schema using Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

4. **Start the Backend Server**:
   In the `backend` directory:
   ```bash
   npm run dev
   ```

5. **Start the Frontend**:
   In the `frontend` directory:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

---

## API Endpoints

### **Authentication**
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`
- **Fetch User Profile**: `GET /api/auth/profile`

### **Watchlist**
- **Add to Watchlist**: `POST /api/watchlist/add`
- **Mark as Watched**: `POST /api/watchlist/watched`
- **Remove from Watchlist**: `DELETE /api/watchlist/remove`
- **Get User Watchlist**: `GET /api/watchlist/userWatchlist`

### **Reviews**
- **Add Review**: `POST /api/reviews/add`
- **Update Review**: `PUT /api/reviews/update`
- **Delete Review**: `DELETE /api/reviews/delete`
- **Get User Review for a Movie**: `GET /api/reviews/user-review/:movie_id`

---

## File Structure

```plaintext
watchtracker/
│
├── backend/               # Backend API
│   ├── controllers/       # Controller functions for API routes
│   ├── models/            # Database models (Prisma ORM)
│   ├── routes/            # API routes
|   |── middleware/        # Auth middleware
│   ├── db/                # Prisma schema
│   └── index.js          # Express server setup
│
├── frontend/              # Frontend React application
│   ├── components/        # Reusable React components
│   ├── contexts/          # React Contexts (e.g., Theme)
│   ├── pages/             # Page-level components
│   ├── store/             # Zustand store files
│   ├── assets/            # Static assets like images
│   └── App.jsx            # Main React application entry
│
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Documentation
```

---

## Usage

1. **Authentication**:
   - Register or log in to use the platform.
2. **Add Movies to Watchlist**:
   - Search for movies and add them to your watchlist.
3. **Mark Movies as Watched**:
   - Once you’ve watched a movie, mark it as seen.
4. **Rate and Review**:
   - Provide or update ratings for movies you’ve watched.
5. **Manage Watchlist**:
   - Search for movies in your watchlist or delete entries.

---

## Screenshots

### Watchlist
![Watchlist Screenshot](./screenshots/watchlist.png)

### Seen Movies
![Seen Movies Screenshot](./screenshots/seen-movies.png)

### Movie Search
![Movie Search Screenshot](./screenshots/movie-search.png)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or support:
- **Name**: Seth Demeterio
- **Email**: sethdemeterio47@gmail.com
- **GitHub**: [dimsits](https://github.com/dimsits)

- **Name**: Ryan Krisztonn Yana
- **Email**: 
- **GitHub**: [username](https://github.com/username)
```
