import { useState } from 'react';

function MovieCard({ movie, onMarkWatched, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleWatched = () => {
    setShowMenu(false);
    onMarkWatched(movie.id); // Mark movie as watched
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete(movie.id); // Delete movie
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-[300px] object-cover"
        />

        {/* Three Dots Menu */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-granite-dark hover:text-granite-medium focus:outline-none"
          >
            &#8942; {/* Vertical three dots */}
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white border border-granite-light shadow-lg rounded-md w-32">
              {/* Conditionally Render Watched Option */}
              {!movie.watched && (
                <button
                  onClick={handleWatched}
                  className="block w-full text-left px-4 py-2 text-granite-dark hover:bg-granite-light transition"
                >
                  Watched
                </button>
              )}
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold font-nunito text-granite-dark mb-2">
          {movie.title}
        </h3>
        <p className="text-sm text-granite-medium line-clamp-2">
          {movie.description}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
