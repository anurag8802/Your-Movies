import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { options, TMDB_IMG_URL } from '../utils/constant';

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
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the genre ID from the map
  const genreId = GENRE_ID_MAP[genreName?.toLowerCase()];

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
        <div className="flex-1 pt-20 pb-10 px-0 md:px-8">
          <h1 className="text-4xl font-bold text-white mb-8 capitalize">{genreName?.replace(/-/g, ' ')}</h1>
          {loading && <div className="text-white">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map(movie => (
              <div key={movie.id} className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <img src={movie.poster_path ? TMDB_IMG_URL + movie.poster_path : ''} alt={movie.title} className="w-full h-60 object-cover" />
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h2 className="text-lg font-semibold text-white mb-2">{movie.title}</h2>
                </div>
              </div>
            ))}
          </div>
          {!loading && movies.length === 0 && !error && (
            <div className="text-white text-xl mt-8">No movies found for this genre.</div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default GenrePage; 