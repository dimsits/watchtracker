import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register'; // Import the Register component
import { ThemeProvider } from './contexts/ThemeContext';
import { MovieProvider } from './contexts/MovieContext';

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Register />} /> {/* Add Register route */}
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
