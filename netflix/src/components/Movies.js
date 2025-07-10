import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import { TMDB_IMG_URL, options } from '../utils/constant';
import axios from 'axios';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../redux/favouriteSlice';
import MovieDialog from './MovieDialog';

const TOTAL_PAGES = 500; // TMDB max for discover/movie

const getRandomPage = () => Math.floor(Math.random() * TOTAL_PAGES) + 1;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(getRandomPage());
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const loader = useRef(null);
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.favourite.movies || []);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
      const res = await axios.get(url, options);
      setMovies(prev => [...prev, ...(res.data.results || [])]);
    } catch (err) {
      setError('Failed to fetch movies.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          setPage(getRandomPage());
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading]);

  const handlePlay = (movie) => {
    setSelectedMovie(movie);
    setShowDialog(true);
  };

  const handleFavourite = (movie) => {
    dispatch(toggleFavourite(movie));
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-neutral-900 to-black w-full">
        <div className="pt-20 pb-8 px-2 sm:px-4 md:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 text-center drop-shadow">All Movies</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {movies.map(movie => {
              const isFav = favourites.some(fav => fav.id === movie.id);
              return (
                <div key={movie.id} className="bg-zinc-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl flex flex-col transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl group relative cursor-pointer" onClick={() => handlePlay(movie)}>
                  <img src={movie.poster_path ? TMDB_IMG_URL + movie.poster_path : ''} alt={movie.title} className="w-full h-40 sm:h-60 object-cover group-hover:opacity-80 transition duration-200" />
                  {/* Heart icon in lower right */}
                  <div
                    className="absolute bottom-2 right-2 z-20"
                    onClick={e => {
                      e.stopPropagation();
                      handleFavourite(movie);
                    }}
                  >
                    <FaHeart className={`text-2xl drop-shadow ${isFav ? 'text-red-600' : 'text-gray-400'}`} />
                  </div>
                  {/* Title always visible at bottom */}
                  <span className="absolute bottom-2 left-2 text-white text-xs sm:text-base font-semibold px-2 py-1 bg-black/60 rounded drop-shadow-lg z-10">
                    {movie.title}
                  </span>
                </div>
              );
            })}
          </div>
          {error && (
            <div className="flex flex-col items-center justify-center text-red-500 mt-8">
              <span className="text-lg font-semibold">{error}</span>
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center h-24">
              <svg className="animate-spin h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>
          )}
          {/* Infinite scroll loader */}
          <div ref={loader} className="h-8"></div>
        </div>
        <Footer />
        {showDialog && selectedMovie && (
          <MovieDialog movie={selectedMovie} onClose={() => setShowDialog(false)} />
        )}
      </div>
    </div>
  );
};

export default Movies; 