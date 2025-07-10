import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { options, TMDB_IMG_URL } from '../utils/constant';
import { FaFilm, FaChevronDown, FaPlay, FaExclamationCircle } from 'react-icons/fa';

// Map genre names (from URL) to TMDB genre IDs
const GENRE_ID_MAP = {
  'action-and-adventure': 28, // Action
  'action': 28,
  'adventure': 12,
  'animation': 16,
  'comedy': 35,
  'crime': 80,
  'documentary': 99,
  'drama': 18,
  'family': 10751,
  'fantasy': 14,
  'horror': 27,
  'mystery-and-thrillers': 9648, // Mystery
  'mystery': 9648,
  'thriller': 53,
  'romance': 10749,
  'science-fiction': 878,
  'kids': 10751, // Family
  'inspirational': 18, // fallback to Drama
};

const GenrePage = () => {
  const { genreName } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the genre ID from the map
  const genreId = GENRE_ID_MAP[genreName?.toLowerCase()];

  // Create a sorted array of genres for the dropdown
  const genreOptions = Object.keys(GENRE_ID_MAP)
    .filter((key, idx, arr) => arr.indexOf(key) === idx) // unique keys
    .map(key => ({
      value: key,
      label: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const handleGenreChange = (e) => {
    navigate(`/genre/${e.target.value}`);
  };

  useEffect(() => {
    if (!genreId) {
      setError('Genre not supported.');
      setMovies([]);
      setLoading(false);
      return;
    }
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`;
        const res = await axios.get(url, options);
        setMovies(res.data.results || []);
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [genreId, genreName]);

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-neutral-900 to-black w-full">
        {/* Banner Section */}
        <div className="relative flex items-center justify-between px-0 md:px-8 pt-20 pb-8 mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-red-600 to-yellow-400 rounded-full p-3 shadow-lg">
              <FaFilm className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg capitalize tracking-tight">
              {genreName?.replace(/-/g, ' ')}
            </h1>
          </div>
          {/* Genre Dropdown */}
          <div className="relative w-48">
            <select
              className="block w-full appearance-none bg-zinc-800 border border-zinc-700 text-white py-3 px-4 pr-10 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 hover:border-yellow-400 hover:ring-yellow-400 cursor-pointer"
              value={genreName}
              onChange={handleGenreChange}
            >
              {genreOptions.map(option => (
                <option key={option.value} value={option.value} className="bg-zinc-900 text-white">
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-400">
              <FaChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex-1 pb-10 px-0 md:px-8">
          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>
          )}
          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center text-red-500 mt-8">
              <FaExclamationCircle className="text-4xl mb-2" />
              <span className="text-xl font-semibold">{error}</span>
            </div>
          )}
          {/* Movie Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map(movie => (
              <div key={movie.id} className="bg-zinc-900 rounded-2xl overflow-hidden shadow-xl flex flex-col transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl group relative">
                <img src={movie.poster_path ? TMDB_IMG_URL + movie.poster_path : ''} alt={movie.title} className="w-full h-60 object-cover group-hover:opacity-80 transition duration-200" />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity duration-200">
                  <button className="bg-red-600 hover:bg-yellow-400 text-white rounded-full p-3 shadow-lg flex items-center gap-2 text-lg font-bold">
                    <FaPlay className="mr-1" /> Play
                  </button>
                  <span className="mt-2 text-white text-center text-base font-semibold px-2 drop-shadow-lg">{movie.title}</span>
                </div>
              </div>
            ))}
          </div>
          {/* No Results State */}
          {!loading && movies.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center mt-16">
              <svg className="w-24 h-24 text-zinc-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
                <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="3" fill="#18181b" />
                <circle cx="24" cy="24" r="6" stroke="#a1a1aa" strokeWidth="2" fill="#27272a" />
                <path d="M16 36c2-2 6-2 8 0" stroke="#a1a1aa" strokeWidth="2" />
              </svg>
              <span className="text-white text-xl font-semibold">No movies found for this genre.</span>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default GenrePage; 