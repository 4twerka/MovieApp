import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Popular() {
  const [movies, setMovies] = useState([]);

  const API_KEY = "cf8f659d3c2a36f2361a2b1bdc7eefa3";
  const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ru-RU&page=1`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(API_URL);
        const json = await result.json();
        console.log(json.results);
        setMovies(json.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gray-900 p-6 text-white">
          <h1 className="text-3xl font-bold cursor-pointer">
            Top Rated Movies
          </h1>
          <nav className="mt-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/popular" className="hover:underline">
                  Popular
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* Main Content */}
        <main className="flex-grow p-6 flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie, index) => {
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="Movie"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                    <p className="text-gray-600 mt-2">{movie.overview}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        ;{/* Footer */}
        <footer className="bg-gray-900 p-6 text-white text-center">
          <p>&copy; 2024 All rights reserved. Website about films.</p>
        </footer>
      </div>
    </>
  );
}

export default Popular;
