import React from 'react'
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { getId, setOpen, setSelectedMovie } from '../redux/movieSlice';
import { addToContinueWatching } from '../redux/continueWatchingSlice';
import { setBackgroundIndex } from '../redux/movieSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store => store.movie.nowPlayingMovies);

  if (movie.poster_path === null) return null;

  const handleOpen = () => {
    dispatch(setSelectedMovie(movie));
    dispatch(getId(movie.id));
    dispatch(setOpen(true));
    dispatch(addToContinueWatching(movie));
    // If this movie is in nowPlayingMovies, set background index
    if (nowPlayingMovies && Array.isArray(nowPlayingMovies)) {
      const idx = nowPlayingMovies.findIndex(m => m.id === movie.id);
      if (idx !== -1) {
        dispatch(setBackgroundIndex(idx));
      }
    }
  }

  return (
    <div className='w-48 pr-2 transform transition-transform duration-200 hover:scale-110 cursor-pointer drop-shadow-lg' onClick={handleOpen}>
      <img src={`${TMDB_IMG_URL}/${movie.poster_path}`} alt="movie-banner" className='rounded-lg shadow-lg'/>
    </div>
  )
}

export default MovieCard;