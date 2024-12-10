function MovieDetails({ movie }) {
    return (
      <div className="bg-granite-softWhite min-h-screen">
        <div className="container mx-auto px-8 py-6">
          <button
            onClick={() => window.history.back()}
            className="mb-6 flex items-center text-granite-dark hover:text-granite-medium transition duration-300"
          >
            <span className="text-lg">←</span>
            <span className="ml-2 font-nunito">Back</span>
          </button>
  
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Movie Poster */}
              <div>
                <img
                  src={movie?.image || '/placeholder.svg?height=600&width=400'}
                  alt={movie?.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
  
              {/* Movie Information */}
              <div>
                <h1 className="text-3xl font-bold font-nunito text-granite-dark mb-4">
                  {movie?.title}
                </h1>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h2 className="text-sm font-semibold text-granite-medium">Released on</h2>
                    <p className="text-granite-dark">{movie?.releaseDate}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-granite-medium">Genre</h2>
                    <p className="text-granite-dark">{movie?.genre}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-granite-medium">Director</h2>
                    <p className="text-granite-dark">{movie?.director}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-granite-medium">Cast</h2>
                    <p className="text-granite-dark">{movie?.cast}</p>
                  </div>
                </div>
  
                <p className="text-granite-dark mb-6">{movie?.description}</p>
  
                <button className="bg-granite-dark text-white px-6 py-3 rounded-md hover:bg-granite-medium transition duration-300 font-nunito">
                  Add to watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default MovieDetails;
  
  