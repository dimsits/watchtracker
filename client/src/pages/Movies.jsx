import React, { useState } from 'react';
import axios from 'axios';
import MovieAddCard from '../components/MovieAddCard';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

function Movies() {
  const { isDarkMode } = useTheme();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      // If searchQuery is empty, you can decide to either do nothing or reset movies.
      // For now, let's just clear results if empty.
      setMovies([]);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/movies/search', { title: searchQuery });
      setMovies(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    }
  };

  // If you want to filter results further on the client side, you can still do so:
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
              Search
            </button>
          </div>
        </div>

        {/* Movies Grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieAddCard
                  key={movie.movie_id}
                  movie={{
                    id: movie.movie_id,
                    title: movie.title,
                    description: movie.plot, // Assuming 'plot' is used as the description
                    poster: movie.poster_url, // Pass poster_url to the component
                  }}
                  onAddToWatchlist={(id) => {
                    // Your add to watchlist logic goes here
                  }}
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
