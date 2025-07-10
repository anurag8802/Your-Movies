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
      <DialogContent style={{ padding: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '80vw', maxWidth: 900, aspectRatio: '16/9', background: 'black', borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loading ? (
            <div style={{ color: 'white', textAlign: 'center', width: '100%' }}>Loading trailer...</div>
          ) : trailerKey ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: 12 }}
            />
          ) : (
            <div style={{ color: 'white', textAlign: 'center', width: '100%' }}>No trailer available.</div>
          )}
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', paddingBottom: 24 }}>
        <Button onClick={onClose} variant="contained" style={{ background: '#e50914', color: '#fff', borderRadius: 20, fontWeight: 'bold', padding: '8px 32px' }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}