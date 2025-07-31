import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import axios from 'axios';
import { options } from '../utils/constant';

export default function MovieDialog({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movie) return;
    setLoading(true);
    setError(null);
    setTrailerKey(null);
    const fetchTrailer = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, options);
        const trailer = res.data.results.find(v => v.site === 'YouTube' && v.type === 'Trailer');
        setTrailerKey(trailer ? trailer.key : null);
      } catch (err) {
        setError('Failed to fetch trailer.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
  }, [movie]);

  return (
    <Dialog
      open={!!movie}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
          background: '#181818',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          padding: 0,
        },
      }}
      aria-labelledby="movie-dialog-title"
      aria-describedby="movie-dialog-description"
    >
      <DialogContent className="bg-[#181818]">
        <div className="flex flex-col">
          {/* Trailer Section */}
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-6">
            {loading ? (
              <div className="flex items-center justify-center h-full text-white">Loading trailer...</div>
            ) : trailerKey ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">No trailer available.</div>
            )}
          </div>

          {/* Movie Information */}
          {movie && (
            <div className="text-white px-4">
              <div className="flex items-start gap-6">
                {/* Movie Poster */}
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                  {movie.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || 'Movie Poster'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                      No Poster
                    </div>
                  )}
                </div>

                {/* Movie Details */}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{movie.title || 'Untitled'}</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    {movie.release_date && (
                      <>
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{movie.adult ? "18+" : "All Ages"}</span>
                    {movie.original_language && (
                      <>
                        <span>•</span>
                        <span>{movie.original_language.toUpperCase()}</span>
                      </>
                    )}
                  </div>
                  
                  {movie.overview && (
                    <>
                      <h2 className="text-xl font-medium mb-1">Overview</h2>
                      <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        {movie.overview}
                      </p>
                    </>
                  )}

                  {(movie.vote_average !== undefined || movie.vote_count !== undefined) && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      {movie.vote_average !== undefined && (
                        <>
                          <span className="text-yellow-500">★</span>
                          <span>{movie.vote_average.toFixed(1)}/10</span>
                        </>
                      )}
                      {movie.vote_count !== undefined && (
                        <>
                          <span>•</span>
                          <span>{movie.vote_count.toLocaleString()} votes</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
      
      <DialogActions className="justify-center pb-6 pt-4 bg-[#181818]">
        <Button 
          onClick={onClose} 
          variant="contained" 
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-2 rounded-full"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}