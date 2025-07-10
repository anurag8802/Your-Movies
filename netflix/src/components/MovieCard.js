import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube';
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { getId, setOpen, setSelectedMovie } from '../redux/movieSlice';
import { addToContinueWatching } from '../redux/continueWatchingSlice';
import { setBackgroundIndex } from '../redux/movieSlice';
import axios from "axios";
import { options } from '../utils/constant';
import { FaHeart } from 'react-icons/fa';
import { toggleFavourite } from '../redux/favouriteSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store => store.movie.nowPlayingMovies);
  const [isHovered, setIsHovered] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimerRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const favouriteMovies = useSelector(state => state.favourite.movies);
  const isFavourite = favouriteMovies.some(m => m.id === movie.id);

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

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
  };

  const fetchTrailer = async () => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, options);
      const trailerData = res?.data?.results?.filter((item) => item.type === "Trailer");
      const videoData = trailerData.length > 0 ? trailerData[0] : res.data.results[0];
      setTrailer(videoData);
    } catch (error) {
      console.log('Error fetching trailer:', error);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Start timer for 3 seconds
    hoverTimerRef.current = setTimeout(() => {
      if (isHovered) {
        fetchTrailer();
        setShowVideo(true);
      }
    }, 3000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    setTrailer(null);
    // Clear the timer
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    // Pause video if it's playing
    if (videoPlayerRef.current) {
      try {
        videoPlayerRef.current.pauseVideo();
      } catch (e) {
        console.log('Error pausing video:', e);
      }
    }
  };

  const onVideoReady = (event) => {
    videoPlayerRef.current = event.target;
  };

  return (
    <div 
      className='w-48 pr-2 transform transition-transform duration-200 hover:scale-110 cursor-pointer drop-shadow-lg relative' 
      onClick={handleOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showVideo && trailer?.key ? (
        <div className="absolute inset-0 z-10 rounded-lg overflow-hidden">
          <YouTube
            videoId={trailer.key}
            containerClassName="w-full h-full"
            className="w-full h-full"
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                loop: 1,
                playlist: trailer.key
              }
            }}
            onReady={onVideoReady}
          />
        </div>
      ) : (
        <img src={`${TMDB_IMG_URL}/${movie.poster_path}`} alt="movie-banner" className='rounded-lg shadow-lg'/>
      )}
      {/* Heart icon for favorite */}
      <div
        className="absolute bottom-2 right-2 z-20"
        onClick={e => {
          e.stopPropagation();
          dispatch(toggleFavourite(movie));
        }}
      >
        <FaHeart className={`text-2xl drop-shadow ${isFavourite ? 'text-red-600' : 'text-gray-400'}`} />
      </div>
    </div>
  )
}

export default MovieCard;