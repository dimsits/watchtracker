import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import MovieDetails from "./components/MovieDetails";
import Seen from "./pages/Seen";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/seen" element={<Seen />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/account" element={<Account />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

