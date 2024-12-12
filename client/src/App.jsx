import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { MovieProvider } from './contexts/MovieContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Seen from './pages/Seen';
import Movies from './pages/Movies';
import Account from './pages/Account';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/seen" element={<Seen />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/account" element={<Account />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
