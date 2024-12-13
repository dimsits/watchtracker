import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import ExpandedMovieCard from "../components/ExpandedMovieCard";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

function Dashboard() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  const [movies, setMovies] = useState([
    {
      movie_id: 1,
      title: "Interstellar",
      year: "2014",
      poster_url: "https://i.ebayimg.com/images/g/2AwAAOSwHslfBJ15/s-l1200.jpg",
      plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      genre: "Action",
      country: "USA",
      language: "English",
      imdb_rating: 8.6,
      like_count: 320,
    },
    {
      movie_id: 2,
      title: "The Martian",
      year: "2015",
      poster_url: "https://upload.wikimedia.org/wikipedia/en/d/de/Nadesico.jpg",
      plot: "An astronaut becomes stranded on Mars after his team assumes him dead, and must rely on his ingenuity to survive.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.0,
      like_count: 250,
    },
    {
      movie_id: 3,
      title: "Gravity",
      year: "2013",
      poster_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy49YsF7y4I8DcD4YKehj6RKTw1IgCWZ8rtQ&s",
      plot: "Two astronauts work together to survive after an accident leaves them stranded in space.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 7.7,
      like_count: 150,
    },
    {
      movie_id: 4,
      title: "Inception",
      year: "2010",
      poster_url: "https://i.ebayimg.com/images/g/LlUAAOSwm8VUwoRL/s-l1200.jpg",
      plot: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.",
      genre: "Action",
      country: "USA",
      language: "English",
      imdb_rating: 8.8,
      like_count: 420,
    },
    {
      movie_id: 5,
      title: "The Dark Knight",
      year: "2008",
      poster_url: "https://www.themoviedb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      plot: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on Gotham.",
      genre: "Action",
      country: "USA",
      language: "English",
      imdb_rating: 9.0,
      like_count: 520,
    },
    {
      movie_id: 6,
      title: "Akira",
      year: "1988",
      poster_url: "https://www.themoviedb.org/t/p/original/5KlRFKKSbyCiyYpZSS3A6G5bW0K.jpg",
      plot: "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.0,
      like_count: 400,
    },
    {
      movie_id: 7,
      title: "Get Out",
      year: "2017",
      poster_url: "https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png",
      plot: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 7.7,
      like_count: 280,
    },
    {
      movie_id: 8,
      title: "Spirited Away",
      year: "2001",
      poster_url: "https://www.themoviedb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
      plot: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.6,
      like_count: 600,
    },
    {
      movie_id: 9,
      title: "It Follows",
      year: "2014",
      poster_url: "https://m.media-amazon.com/images/M/MV5BNGZiYWRiYjAtODU0NS00YzAzLTk2MzQtZGVlMzVjM2M3MGQ3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      plot: "A young woman is followed by an unknown supernatural force after a sexual encounter.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 6.8,
      like_count: 300,
    },
    {
      movie_id: 10,
      title: "My Neighbor Totoro",
      year: "1988",
      poster_url: "https://m.media-amazon.com/images/M/MV5BYWM3MDE3YjEtMzIzZC00ODE5LTgxNTItNmUyMTBkM2M2NmNiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      plot: "Two girls move to the countryside to be near their ailing mother, and they have adventures with the wondrous forest spirits who live nearby.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.2,
      like_count: 500,
    },
    {
      movie_id: 11,
      title: "The Conjuring",
      year: "2013",
      poster_url: "https://www.themoviedb.org/t/p/original/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
      plot: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 7.5,
      like_count: 450,
    },
    {
      movie_id: 12,
      title: "Princess Mononoke",
      year: "1997",
      poster_url: "https://upload.wikimedia.org/wikipedia/en/8/8c/Princess_Mononoke_Japanese_poster.png",
      plot: "On a journey to find the cure for a curse, Ashitaka finds himself in the middle of a war between the forest gods and a mining colony.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.4,
      like_count: 620,
    },
    {
      movie_id: 13,
      title: "A Quiet Place",
      year: "2018",
      poster_url: "https://www.themoviedb.org/t/p/original/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
      plot: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 7.5,
      like_count: 340,
    },
    {
      movie_id: 14,
      title: "Your Name",
      year: "2016",
      poster_url: "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png",
      plot: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.4,
      like_count: 700,
    },
    {
      movie_id: 15,
      title: "Parasite",
      year: "2019",
      poster_url: "https://www.themoviedb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      genre: "Action",
      country: "South Korea",
      language: "Korean",
      imdb_rating: 8.6,
      like_count: 700,
    },
    {
      movie_id: 16,
      title: "Demon Slayer: Mugen Train",
      year: "2020",
      poster_url: "https://www.themoviedb.org/t/p/original/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg",
      plot: "After completing their training, Tanjiro and his comrades embark on a new mission aboard the Mugen Train.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.2,
      like_count: 620,
    },
    {
      movie_id: 17,
      title: "Hereditary",
      year: "2018",
      poster_url: "https://www.themoviedb.org/t/p/original/4GFPuL14eXi66V96xBWY73Y9PfR.jpg",
      plot: "A grieving family is haunted by tragic and disturbing occurrences.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 7.3,
      like_count: 410,
    },
    {
      movie_id: 18,
      title: "Howl's Moving Castle",
      year: "2004",
      poster_url: "https://images.fathomevents.com/image/upload/w_1200,dpr_2,f_auto,q_auto/v1726506268/Events/2024/1923/WebsitePoster_1000x1480.jpg.jpg",
      plot: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.2,
      like_count: 530,
    },
    {
      movie_id: 19,
      title: "Midsommar",
      year: "2019",
      poster_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuj8WvZotP1BjLEL6XtYAKmCqLJv5VXmHgiA&s",
      plot: "A couple travels to Sweden to visit a rural hometown's fabled mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 7.1,
      like_count: 320,
    },
    {
      movie_id: 20,
      title: "Castle in the Sky",
      year: "1986",
      poster_url: "https://m.media-amazon.com/images/M/MV5BYTJhNWIxNmUtYThlYy00NGNmLWE4NTItZWY5MmI4ZWNhMTNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      plot: "A young boy and a girl with a magic crystal must race against pirates and foreign agents in a search for a legendary floating castle.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.0,
      like_count: 480,
    },
    {
      movie_id: 21,
      title: "Sinister",
      year: "2012",
      poster_url: "https://m.media-amazon.com/images/M/MV5BMjI5MTg1Njg0Ml5BMl5BanBnXkFtZTcwNzg2Mjc4Nw@@._V1_.jpg",
      plot: "Washed-up true crime writer Ellison Oswalt finds a box of Super 8 home movies that suggest the murder he is currently researching is the work of a serial killer.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 6.8,
      like_count: 350,
    },
    {
      movie_id: 22,
      title: "Rurouni Kenshin",
      year: "2012",
      poster_url: "https://m.media-amazon.com/images/M/MV5BNzYyY2U1N2EtOGNlYy00YzMxLWI2ZjgtMDZmMzRhNjIzMTcyXkEyXkFqcGc@._V1_.jpg",
      plot: "In 1868, after the end of the Bakumatsu war, former assassin Kenshin Himura wanders through Japan as a protector.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 7.6,
      like_count: 540,
    },
    {
      movie_id: 23,
      title: "The Witch",
      year: "2015",
      poster_url: "https://upload.wikimedia.org/wikipedia/en/b/bf/The_Witch_poster.png",
      plot: "A family in 1630s New England is torn apart by the forces of witchcraft, black magic, and possession.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 6.9,
      like_count: 330,
    },
    {
      movie_id: 24,
      title: "Weathering With You",
      year: "2019",
      poster_url: "https://m.media-amazon.com/images/M/MV5BOTM1NDE4NGUtZDJkNi00NjIzLWIyOTgtZGQ4NTM1ZmU4YjNmXkEyXkFqcGc@._V1_.jpg",
      plot: "A high-school boy who has run away to Tokyo befriends a girl who appears to be able to manipulate the weather.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 7.5,
      like_count: 620,
    },
    {
      movie_id: 25,
      title: "Train to Busan",
      year: "2016",
      poster_url: "https://m.media-amazon.com/images/M/MV5BMTkwOTQ4OTg0OV5BMl5BanBnXkFtZTgwMzQyOTM0OTE@._V1_.jpg",
      plot: "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
      genre: "Action",
      country: "South Korea",
      language: "Korean",
      imdb_rating: 7.6,
      like_count: 550,
    },
    {
      movie_id: 26,
      title: "Jujutsu Kaisen 0",
      year: "2021",
      poster_url: "https://m.media-amazon.com/images/M/MV5BMzNhZTdmNDYtNTA0NC00MmNmLWIzYjUtNjg5NzNlYWQ0N2E5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      plot: "Yuta Okkotsu, a nervous high school student, enrolls in the mysterious Tokyo Jujutsu High School under the guidance of Satoru Gojo after being haunted by the curse of his childhood friend.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 8.0,
      like_count: 530,
    },
    {
      movie_id: 27,
      title: "The Shining",
      year: "1980",
      poster_url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg/220px-The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg",
      plot: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
      genre: "Horror",
      country: "USA",
      language: "English",
      imdb_rating: 8.4,
      like_count: 620,
    },
    {
      movie_id: 28,
      title: "Vampire Hunter D",
      year: "1985",
      poster_url: "https://m.media-amazon.com/images/M/MV5BMWE4MjMyOTQtZDI2OC00NTUxLTg3NzYtMDAxMzI2MmUzNjM4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      plot: "In a post-nuclear world, the last remaining vampires plot to overthrow humanity.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 7.3,
      like_count: 500,
    },
    {
      movie_id: 29,
      title: "Ponyo",
      year: "2008",
      poster_url: "https://upload.wikimedia.org/wikipedia/en/5/51/Ponyo.png",
      plot: "The son of a sailor, 5-year old Sosuke, befriends a goldfish princess who longs to become human.",
      genre: "Anime",
      country: "Japan",
      language: "Japanese",
      imdb_rating: 7.6,
      like_count: 520,
    },
  ]);

  const handleMarkSeen = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.movie_id === id ? { ...movie, seen: true } : movie
      )
    );
    setExpandedMovieId(null);
  };

  const handleDelete = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.movie_id !== id));
    setExpandedMovieId(null);
  };

  const handleExpand = (id) => {
    setExpandedMovieId(id === expandedMovieId ? null : id);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setIsSearching(searchQuery !== "");
  }, [searchQuery]);

  const expandedMovie = movies.find((movie) => movie.movie_id === expandedMovieId);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
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
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white border-gray-300"
              } focus:outline-none focus:border-blue-500`}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

      {/* Recently Added Section */}
{movies.length > 0 && !isSearching && (
  <section className="mb-8">
    <h2
      className={`text-2xl font-bold mb-4 ${
        isDarkMode ? "text-white" : "text-gray-800"
      }`}
    >
      Recently Added
    </h2>
    <div className="relative group">
      {/* Scrollable Row */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide recently-added-scroll">
        {movies
          .slice()
          .sort(() => 0.5 - Math.random())
          .slice(0, 20) // Select 9 random movies
          .map((movie) => (
            <MovieCard
              key={movie.movie_id}
              movie={movie}
              onMarkSeen={handleMarkSeen}
              onDelete={handleDelete}
              onExpand={handleExpand}
              isExpanded={movie.movie_id === expandedMovieId}
            />
          ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => {
          const scrollContainer = document.querySelector(".recently-added-scroll");
          if (scrollContainer) scrollContainer.scrollBy({ left: -400, behavior: "smooth" });
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ←
      </button>
      <button
        onClick={() => {
          const scrollContainer = document.querySelector(".recently-added-scroll");
          if (scrollContainer) scrollContainer.scrollBy({ left: 400, behavior: "smooth" });
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
      >
        →
      </button>
    </div>
  </section>
)}

        {/* All Movies Section */}
        <section>
  <h2
    className={`text-2xl font-bold mb-4 ${
      isDarkMode ? "text-white" : "text-gray-800"
    }`}
  >
    All Movies
  </h2>
  <div className="flex flex-wrap justify-start gap-4 px-4">
    {filteredMovies.map((movie) => (
      <MovieCard
        key={movie.movie_id}
        movie={movie}
        onMarkSeen={handleMarkSeen}
        onDelete={handleDelete}
        onExpand={handleExpand}
        isExpanded={movie.movie_id === expandedMovieId}
      />
    ))}
  </div>
</section>

      </main>

      {/* Expanded Movie Card */}
      {expandedMovie && (
        <ExpandedMovieCard
          movie={expandedMovie}
          onMarkSeen={handleMarkSeen}
          onDelete={handleDelete}
          onCollapse={() => setExpandedMovieId(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
