import React, { useState } from 'react';
import axios from 'axios';
import MovieAddCard from '../components/MovieAddCard';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import useAuthStore from '../store/authStore';

function Movies() {
  const { isDarkMode } = useTheme();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setMovies([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/movies/search',
        { title: searchQuery }
      );
      setMovies(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error searching movies:', error);
      setErrorMessage('Error fetching movies. Please try again.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission (if inside a form)
      handleSearch();
    }
  };

  const handleAddToWatchlist = async (movie_id) => {
    console.log('Movie ID being added:', movie_id);
  
    try {
      const token = useAuthStore.getState().token;
  
      // Log the token for debugging
      console.log('Auth Token from Zustand:', token);
  
      if (!token) {
        alert('You are not authenticated. Please log in.');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:5000/api/watchlist/add',
        { movie_id }, // Request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in headers
          },
        }
      );
  
      console.log('Response:', response.data);
      alert('Movie added to watchlist successfully!');
    } catch (error) {
      console.error('Error adding to watchlist:', error.response ? error.response.data : error);
      alert(
        error.response?.data?.message || 'Failed to add movie to watchlist. Please try again later.'
      );
    }
  };
  

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-granite-softWhite'
      }`}
    >
      <Header />

      <main className="pt-20 px-4 md:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown} // Added onKeyDown handler
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-white border-granite-medium'
              } focus:outline-none focus:border-granite-dark`}
            />
            <button
              onClick={handleSearch}
              className={`px-4 py-2 rounded-md text-white ${
                isDarkMode ? 'bg-granite-dark' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Loading...' : 'Search'}
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
          )}
        </div>

        {/* Movies Grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieAddCard
                  key={movie.movie_id}
                  movie={movie}
                  onAddToWatchlist={handleAddToWatchlist} // Pass handler
                />
              ))
            ) : (
              <p
                className={`text-center ${
                  isDarkMode ? 'text-gray-400' : 'text-granite-medium'
                }`}
              >
                No movies match your search.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Movies;
