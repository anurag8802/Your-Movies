import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from './MovieCard';
import { removeFromContinueWatching } from '../redux/continueWatchingSlice';

const ContinueWatching = () => {
  const movies = useSelector(state => state.continueWatching.movies);
  const dispatch = useDispatch();

  // Persist continue watching list to localStorage
  useEffect(() => {
    localStorage.setItem('continueWatching', JSON.stringify(movies));
  }, [movies]);

  if (!movies.length) return null;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-white mb-4">Continue Watching</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {movies.map(movie => (
          <div key={movie.id} className="relative">
            <MovieCard movie={movie} />
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full p-1 text-white hover:bg-red-600 z-10"
              onClick={e => {
                e.stopPropagation();
                dispatch(removeFromContinueWatching(movie.id));
              }}
              aria-label="Remove"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ContinueWatching; 