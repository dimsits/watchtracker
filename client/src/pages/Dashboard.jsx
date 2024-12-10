import { useState } from 'react';
import MovieCard from '../components/MovieCard';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('watchlist');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Interstellar',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A lone astronaut ventures into deep space...',
      watched: false,
    },
    {
      id: 2,
      title: 'The Martian',
      image: '/placeholder.svg?height=300&width=200',
      description: 'An astronaut stranded on Mars struggles to survive.',
      watched: false,
    },
    {
      id: 3,
      title: 'Gravity',
      image: '/placeholder.svg?height=300&width=200',
      description: 'Two astronauts work together to survive in space.',
      watched: true,
    },
    {
      id: 4,
      title: 'Inception',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A thief enters dreams to steal corporate secrets.',
      watched: false,
    },
    {
      id: 5,
      title: 'Tenet',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A secret agent must manipulate time to prevent catastrophe.',
      watched: true,
    },
    {
      id: 6,
      title: 'Ad Astra',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A man travels to space to find his missing father.',
      watched: false,
    },
    {
      id: 7,
      title: 'The Imitation Game',
      image: '/placeholder.svg?height=300&width=200',
      description: 'The story of Alan Turing and the Enigma code.',
      watched: true,
    },
    {
      id: 8,
      title: 'Arrival',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A linguist communicates with extraterrestrial visitors.',
      watched: false,
    },
    {
      id: 9,
      title: 'Blade Runner 2049',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A blade runner unearths a long-buried secret.',
      watched: true,
    },
    {
      id: 10,
      title: 'Apollo 13',
      image: '/placeholder.svg?height=300&width=200',
      description: 'NASA faces a crisis during a lunar mission.',
      watched: true,
    },
    {
      id: 11,
      title: 'Dune',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A noble family becomes embroiled in galactic conflict.',
      watched: false,
    },
    {
      id: 12,
      title: 'The Midnight Sky',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A lone scientist tries to warn astronauts about Earth.',
      watched: false,
    },
    {
      id: 13,
      title: 'The Revenant',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A frontiersman fights for survival after being left for dead.',
      watched: false,
    },
    {
      id: 14,
      title: 'Ex Machina',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A programmer is selected to test a groundbreaking AI.',
      watched: true,
    },
    {
      id: 15,
      title: 'Oblivion',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A drone technician uncovers the truth about humanity.',
      watched: false,
    },
    {
      id: 16,
      title: 'Her',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A man develops a relationship with an intelligent AI.',
      watched: true,
    },
    {
      id: 17,
      title: 'Mad Max: Fury Road',
      image: '/placeholder.svg?height=300&width=200',
      description: 'In a post-apocalyptic wasteland, survival is key.',
      watched: false,
    },
    {
      id: 18,
      title: 'The Matrix',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A computer hacker learns the truth about his reality.',
      watched: true,
    },
    {
      id: 19,
      title: 'Warcraft',
      image: '/placeholder.svg?height=300&width=200',
      description: 'Humans and orcs clash in an epic fantasy adventure.',
      watched: false,
    },
    {
      id: 20,
      title: 'Star Wars: A New Hope',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A young hero joins the rebellion against an evil empire.',
      watched: true,
    },
    {
      id: 21,
      title: 'Rogue One',
      image: '/placeholder.svg?height=300&width=200',
      description: 'Rebels attempt to steal the Death Star plans.',
      watched: true,
    },
    {
      id: 22,
      title: 'The Avengers',
      image: '/placeholder.svg?height=300&width=200',
      description: 'Earth’s mightiest heroes band together to save the world.',
      watched: false,
    },
    {
      id: 23,
      title: 'Guardians of the Galaxy',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A group of misfits unites to save the universe.',
      watched: false,
    },
    {
      id: 24,
      title: 'Doctor Strange',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A surgeon discovers the mystical arts.',
      watched: true,
    },
    {
      id: 25,
      title: 'Iron Man',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A billionaire builds a suit to fight injustice.',
      watched: true,
    },
    {
      id: 26,
      title: 'Black Panther',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A king must defend his nation and claim his throne.',
      watched: false,
    },
    {
      id: 27,
      title: 'Thor: Ragnarok',
      image: '/placeholder.svg?height=300&width=200',
      description: 'The god of thunder faces an apocalyptic threat.',
      watched: false,
    },
    {
      id: 28,
      title: 'The Dark Knight',
      image: '/placeholder.svg?height=300&width=200',
      description: 'Batman battles the Joker to save Gotham City.',
      watched: true,
    },
    {
      id: 29,
      title: 'Joker',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A man’s descent into madness sparks a cultural revolution.',
      watched: false,
    },
    {
      id: 30,
      title: 'Parasite',
      image: '/placeholder.svg?height=300&width=200',
      description: 'A poor family infiltrates a wealthy household.',
      watched: true,
    },
  ]);
  
  

  // Mark movie as watched
  const handleMarkWatched = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, watched: true } : movie
      )
    );
  };

  // Delete movie
  const handleDelete = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  // Filter movies for active tab
  const filteredMovies = movies
    .filter((movie) =>
      activeTab === 'watchlist' ? !movie.watched : movie.watched
    )
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    ); // Filter based on search query

  return (
    <div className="min-h-screen bg-granite-softWhite">
      {/* Navigation Bar */}
      <header className="bg-granite-dark text-white py-4 px-8 shadow-md">
  <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-2xl font-bold font-nunito">WatchTracker</h1>
    
    {/* Centered Navigation */}
    <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-12">
      <a 
        href="/dashboard" 
        className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito"
      >
        My List
      </a>
      <a 
        href="/movies" 
        className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito"
      >
        Movies
      </a>
      <a 
        href="/account" 
        className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito"
      >
        Account
      </a>
      <a 
        href="/login" 
        className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito"
      >
        Logout
      </a>
    </nav>
  </div>
</header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input
              className="w-full px-4 py-2 rounded-md border border-granite-medium focus:outline-none focus:border-granite-dark bg-white"
            />
            <span className="absolute right-3 top-2.5 text-granite-medium">&#128269;</span>
          </div>
        </div>

        {/* Movie List Section */}
        <section>
          <h2 className="text-2xl font-nunito mb-4 text-Black">
            {activeTab === 'watchlist' ? 'Your Watchlist' : 'Movies You’ve Seen'}
          </h2>

          {/* Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`px-4 py-2 rounded-md font-nunito transition duration-300 ${
                activeTab === 'watchlist'
                  ? 'bg-granite-dark text-white'
                  : 'bg-granite-light text-granite-dark hover:bg-granite-medium'
              }`}
            >
              Watchlist
            </button>
            <button
              onClick={() => setActiveTab('seen')}
              className={`px-4 py-2 rounded-md font-nunito transition duration-300 ${
                activeTab === 'seen'
                  ? 'bg-granite-dark text-white'
                  : 'bg-granite-light text-granite-dark hover:bg-granite-medium'
              }`}
            >
              Seen
            </button>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMarkWatched={handleMarkWatched}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="text-center text-granite-medium">
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
