import React, { useState } from 'react';
import MovieAddCard from '../components/MovieAddCard';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

function Movies() {
  const { isDarkMode } = useTheme();
  const [movies, setMovies] = useState([
    // Example movie data
    {
      id: 1,
      title: "The Grand Adventure",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6",
      description: "An explorer embarks on a quest to find hidden treasures.",
    },
    {
      id: 2,
      title: "Into the Unknown",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6",
      description: "A thrilling sci-fi story about intergalactic survival.",
    },
    {
      id: 3,
      title: "Culinary Secrets",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6",
      description: "A passionate chef rediscovers life through food.",
    },
    {
      id: 4,
      title: "The Midnight Detective",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6",
      description: "A private investigator uncovers a conspiracy in the city.",
    },
    {
      id: 5,
      title: "Starlight Sonata",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6",
      description: "A musician finds inspiration in the vastness of space.",
    },
    // More movies...
  ]);

  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToWatchlist = (movieId) => {
    const movieToAdd = movies.find((movie) => movie.id === movieId);
    if (movieToAdd) {
      // Add to watchlist
      setWatchlist((prev) => [...prev, movieToAdd]);
      // Remove from movies list
      setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
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
      {/* Header Component */}
      <Header />

      <main className="pt-20 px-4 md:px-8">
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

        {/* Movies Grid */}
        <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
  {filteredMovies.length > 0 ? (
    filteredMovies.map((movie) => (
      <MovieAddCard
        key={movie.id}
        movie={movie}
        onAddToWatchlist={handleAddToWatchlist}
      />
    ))
  ) : (
    <p
      className={`text-center ${
        isDarkMode ? "text-gray-400" : "text-granite-medium"
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
