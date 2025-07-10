import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TMDB_IMG_URL, SEARCH_MOVIE_URL, options } from '../utils/constant';
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const relatedKeywords = [
  'Portrait of a Lady on Fire',
  'The Portrait of a Lady',
  'Portrait of a Great Lady',
  'Queen Elizabeth: The Queen Mother',
  'Portraits of a Naked Lady Dancer'
];

const SearchResults = () => {
  const navigate = useNavigate();
  const { movieName, searchedMovie } = useSelector(store => store.search);
  const [searchTerm, setSearchTerm] = useState(movieName || '');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Trigger search on Enter key
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      await triggerSearch(searchTerm);
    }
  };

  // Trigger search on related keyword click
  const handleKeywordClick = async (keyword) => {
    setSearchTerm(keyword);
    await triggerSearch(keyword);
  };

  // Search function
  const triggerSearch = async (query) => {
    dispatch(setLoading(true));
    try {
      const res = await fetch(`${SEARCH_MOVIE_URL}${query}&include_adult=false&language=en-US&page=1`, options);
      const data = await res.json();
      dispatch(setSearchMovieDetails({ searchMovie: query, movies: data.results }));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 w-full flex flex-col justify-between">
      {/* Header with search bar */}
      <div>
        <div className="sticky top-0 z-20 bg-black bg-opacity-90 flex items-center px-8 py-4 border-b border-neutral-800">
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 bg-clip-text text-transparent font-sans tracking-wide drop-shadow-lg select-none animate-pulse transition-transform duration-200 hover:scale-110 hover:drop-shadow-2xl cursor-pointer" onClick={() => navigate('/browse')}>YOURMOVIES</h1>
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              className="w-[680px] bg-neutral-800 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Related keywords */}
        <div className="px-8 py-4 text-neutral-300 text-lg">
          <span className="mr-2">Explore titles related to:</span>
          {relatedKeywords.map((keyword, idx) => (
            <span
              key={idx}
              className="mr-3 underline cursor-pointer hover:text-white"
              onClick={() => handleKeywordClick(keyword)}
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Results grid */}
        <div className="px-8 pb-16">
          {searchedMovie && searchedMovie.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
              {searchedMovie.map((movie) => (
                <div key={movie.id} className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <img
                    src={movie.poster_path ? `${TMDB_IMG_URL}/${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-2 text-white text-center text-sm font-semibold truncate">
                    {movie.title}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-white text-2xl mt-10">Movie Not Found!!</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
