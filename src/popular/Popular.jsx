import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Popular() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [genres, setGenres] = useState([]);

    const API_KEY = "cf8f659d3c2a36f2361a2b1bdc7eefa3";
    const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=eng-ENG&page=1`;
    const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=eng-ENG`;

    
    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const response = await fetch(genresUrl);
          const data = await response.json();
          setGenres(data.genres);
        } catch (error) {
          console.error("Error fetching genres:", error);
        }
      };
      fetchGenres();
    }, []);

    const getGenreNames = (genreIds) => {
      return genreIds.map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : "Unknown";
      });
    };

  useEffect(() => {
      const fetchData = async () => {
        setisLoading(true);
      try {
        const result = await fetch(API_URL);
        const json = await result.json();
        console.log(json.results);
        setMovies(json.results);
      } catch (error) {
        console.error(error);
      } finally {
          setisLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <h1 className="text-4xl font-extrabold tracking-wider cursor-pointer hover:text-purple-200 transition duration-300">
          🎬 Movies
        </h1>
        <nav className="mt-4">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="hover:underline hover:text-purple-200 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/popular"
                className="hover:underline hover:text-purple-200 transition duration-300"
              >
                Popular
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 flex justify-center items-center">
        {isLoading ? (
          <div className="text-2xl animate-pulse">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies.length > 0 ? (
              movies.map((movie, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:scale-105"
                  >
                    <div className="relative">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full object-cover aspect-[2/3] rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-white">
                        {movie.title}
                      </h2>
                      <p className="text-gray-400 mt-4">{movie.overview}</p>

                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <p className="text-green-400">
                            Release Date:
                            <span className="text-white">
                              {" "}
                              {movie.release_date}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-red-400">
                            Rating:
                            <span className="text-white">
                              {" "}
                              {movie.vote_average}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-5">
                        <p className="text-purple-500 text-center sm:text-left">
                          Genre:
                        </p>
                      </div>
                      <div className="flex justify-center sm:justify-start mt-1 flex-wrap gap-x-2 gap-y-1">
                        {getGenreNames(movie.genre_ids).map((genre, index) => (
                          <span
                            key={index}
                            className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm sm:text-base"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-red-500">Bad Internet connection</p>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
        <p className="text-lg">
          &copy; 2024 All rights reserved. Website about films.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-white hover:text-purple-200">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white hover:text-purple-200">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white hover:text-purple-200">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </footer>
    </div>
  );

}

export default Popular;
