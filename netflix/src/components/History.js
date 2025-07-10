import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import Header from './Header';

const History = () => {
  const movies = useSelector(state => state.continueWatching.movies);

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">History</h1>
      {movies.length === 0 ? (
        <div className="text-lg">No history yet.</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default History; 