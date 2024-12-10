import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([
    // Add your placeholder movies here
  ]);

  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => [...prev, movie]);
    setMovies((prev) => prev.filter((m) => m.id !== movie.id)); // Remove from movies
  };

  return (
    <MovieContext.Provider value={{ movies, watchlist, addToWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
