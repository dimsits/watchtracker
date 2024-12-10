import React, { useState } from 'react';
import MovieAddCard from '../components/MovieAddCard';
import { useTheme } from '../contexts/ThemeContext';

function Movies() {
  const { isDarkMode } = useTheme();
  const [movies, setMovies] = useState([
    // Example movie data
    {
       id: 1,
    title: "The Grand Adventure",
    image: "/placeholder.svg?height=300&width=200",
    description: "An explorer embarks on a quest to find hidden treasures.",
  },
  {
    id: 2,
    title: "Into the Unknown",
    image: "/placeholder.svg?height=300&width=200",
    description: "A thrilling sci-fi story about intergalactic survival.",
  },
  {
    id: 3,
    title: "Culinary Secrets",
    image: "/placeholder.svg?height=300&width=200",
    description: "A passionate chef rediscovers life through food.",
  },
  {
    id: 4,
    title: "The Midnight Detective",
    image: "/placeholder.svg?height=300&width=200",
    description: "A private investigator uncovers a conspiracy in the city.",
  },
  {
    id: 5,
    title: "Starlight Sonata",
    image: "/placeholder.svg?height=300&width=200",
    description: "A musician finds inspiration in the vastness of space.",
  },
  {
    id: 6,
    title: "The Last Kingdom",
    image: "/placeholder.svg?height=300&width=200",
    description: "A medieval knight defends his land from invading forces.",
  },
  {
    id: 7,
    title: "Tech Titans",
    image: "/placeholder.svg?height=300&width=200",
    description: "A hacker discovers a dangerous secret in a tech empire.",
  },
  {
    id: 8,
    title: "The Ocean's Heart",
    image: "/placeholder.svg?height=300&width=200",
    description: "A deep-sea diver uncovers the mysteries of the ocean.",
  },
  {
    id: 9,
    title: "Chasing Eternity",
    image: "/placeholder.svg?height=300&width=200",
    description: "A historian unravels a myth about eternal life.",
  },
  {
    id: 10,
    title: "Beyond the Horizon",
    image: "/placeholder.svg?height=300&width=200",
    description: "An astronaut journeys to the edge of the solar system.",
  },
  {
    id: 11,
    title: "Pixelated Dreams",
    image: "/placeholder.svg?height=300&width=200",
    description: "A gamer discovers a new reality inside a virtual world.",
  },
  {
    id: 12,
    title: "The Forgotten Forest",
    image: "/placeholder.svg?height=300&width=200",
    description: "A ranger uncovers secrets hidden deep in the woods.",
  },
  {
    id: 13,
    title: "City of Shadows",
    image: "/placeholder.svg?height=300&width=200",
    description: "A vigilante fights crime in a corrupt metropolis.",
  },
  {
    id: 14,
    title: "Timeless Wanderer",
    image: "/placeholder.svg?height=300&width=200",
    description: "A time traveler learns to balance past and future.",
  },
  {
    id: 15,
    title: "Falling Skies",
    image: "/placeholder.svg?height=300&width=200",
    description: "A family survives in a world under alien attack.",
  },
  {
    id: 16,
    title: "Aurora Chronicles",
    image: "/placeholder.svg?height=300&width=200",
    description: "A young scientist unlocks the power of the northern lights.",
  },
  {
    id: 17,
    title: "Desert Mirage",
    image: "/placeholder.svg?height=300&width=200",
    description: "A traveler discovers an ancient civilization in the desert.",
  },
  {
    id: 18,
    title: "Code of Honor",
    image: "/placeholder.svg?height=300&width=200",
    description: "A samurai must choose between loyalty and justice.",
  },
  {
    id: 19,
    title: "The Art of Deception",
    image: "/placeholder.svg?height=300&width=200",
    description: "A con artist plans the biggest heist of their career.",
  },
  {
    id: 20,
    title: "Eternal Bloom",
    image: "/placeholder.svg?height=300&width=200",
    description: "A botanist uncovers a flower with magical properties.",
  },
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
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-granite-dark'} text-white py-4 px-8 shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-nunito">WatchTracker</h1>
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-12">
            <a href="/dashboard" className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito">My List</a>
            <a href="/movies" className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito">Movies</a>
            <a href="/account" className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito">Account</a>
            <a href="/login" className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito">Logout</a>
          </nav>
        </div>
      </header>

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

        {/* Movies Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
