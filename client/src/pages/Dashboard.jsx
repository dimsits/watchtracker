import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header'; // Centralized Header
import { useTheme } from '../contexts/ThemeContext';

function Dashboard() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('watchlist');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Interstellar',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS3SYg9fFcXLvbebCqOsbMnF2SwNKUACmrAA&s',
      description: 'A lone astronaut ventures into deep space...',
      watched: false,
    },
    {
      id: 2,
      title: 'The Martian',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS3SYg9fFcXLvbebCqOsbMnF2SwNKUACmrAA&s',
      description: 'An astronaut stranded on Mars struggles to survive.',
      watched: false,
    },
    {
      id: 3,
      title: 'Gravity',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS3SYg9fFcXLvbebCqOsbMnF2SwNKUACmrAA&s',
      description: 'Two astronauts work together to survive in space.',
      watched: true,
    },
    {
      id: 4,
      title: 'Inception',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS3SYg9fFcXLvbebCqOsbMnF2SwNKUACmrAA&s',
      description: 'A thief enters dreams to steal corporate secrets.',
      watched: false,
    },
    // Add the rest of your movie objects
  ]);

  const handleMarkWatched = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, watched: true } : movie
      )
    );
  };

  const handleDelete = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const filteredMovies = movies
    .filter((movie) =>
      activeTab === 'watchlist' ? !movie.watched : movie.watched
    )
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-granite-softWhite'
      }`}
    >
      <Header />

      {/* Add Padding to Prevent Header Overlap */}
      <main className="container mx-auto px-8 py-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
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
            <span className="absolute right-3 top-2.5 text-granite-medium">
              &#128269;
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
  <button
    onClick={() => setActiveTab('watchlist')}
    className={`px-6 py-3 rounded-full font-nunito text-lg flex items-center justify-center transition duration-500 ${
      activeTab === 'watchlist'
        ? isDarkMode
          ? 'bg-[#5FA5B3] text-white hover:bg-[#6FB6C5]' // Lighter blue for dark mode
          : 'bg-[#8BC8D4] text-white hover:bg-[#A1D8E0]' // Even lighter blue for light mode
        : isDarkMode
        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        : 'bg-granite-light text-granite-dark hover:bg-granite-medium'
    }`}
  >
    <span className="mr-2">📋</span>
    Watchlist
  </button>
  <button
    onClick={() => setActiveTab('seen')}
    className={`px-6 py-3 rounded-full font-nunito text-lg flex items-center justify-center transition duration-500 ${
      activeTab === 'seen'
        ? isDarkMode
          ? 'bg-[#6FB5A4] text-white hover:bg-[#80C5B3]' // Lighter green for dark mode
          : 'bg-[#A1D9C8] text-white hover:bg-[#B2E4D6]' // Even lighter green for light mode
        : isDarkMode
        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        : 'bg-granite-light text-granite-dark hover:bg-granite-medium'
    }`}
  >
    <span className="mr-2">👁️</span>
    Seen
  </button>
</div>


        {/* Movie Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMarkWatched={handleMarkWatched}
                  onDelete={handleDelete}
                  isDarkMode={isDarkMode}
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

export default Dashboard;
