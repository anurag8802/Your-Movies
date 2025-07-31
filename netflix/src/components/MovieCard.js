import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube';
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { getId, setOpen, setSelectedMovie } from '../redux/movieSlice';
import { addToContinueWatching } from '../redux/continueWatchingSlice';
import { setBackgroundIndex } from '../redux/movieSlice';
import axios from "axios";
import { options } from '../utils/constant';
import { FaHeart, FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import { toggleFavourite } from '../redux/favouriteSlice';

const MovieCard = ({ movie, index }) => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store => store.movie.nowPlayingMovies);
  const [isHovered, setIsHovered] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [state, setState] = useState();
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const hoverTimerRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const cardRef = useRef(null);
  const favouriteMovies = useSelector(state => state.favourite.movies);
  const isFavourite = favouriteMovies.some(m => m.id === movie.id);

  // First useEffect: Handle trailer fetching
  useEffect(() => {
    let isMounted = true;

    const fetchTrailer = async () => {
      if (!trailer && !isVideoLoading && isHovered) {
        setIsVideoLoading(true);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
            options
          );
          const videos = response.data.results;
          const trailerVideo = videos.find(
            video => video.type === "Trailer" || video.type === "Teaser"
          );
          if (isMounted && trailerVideo) {
            setTrailer(trailerVideo);
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
        } finally {
          if (isMounted) {
            setIsVideoLoading(false);
          }
        }
      }
    };

    fetchTrailer();

    return () => {
      isMounted = false;
    };
  }, [isHovered, movie.id, trailer, isVideoLoading]);

  // Second useEffect: Handle video display timing
  useEffect(() => {
    let timeoutId = null;

    if (isHovered && trailer) {
      timeoutId = setTimeout(() => {
        setShowVideo(true);
      }, 800);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (!isHovered) {
        setShowVideo(false);
      }
    };
  }, [isHovered, trailer]);

  // Cleanup useEffect: Handle YouTube player cleanup
  useEffect(() => {
    return () => {
      if (videoPlayerRef.current) {
        try {
          videoPlayerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying YouTube player:", error);
        }
      }
    };
  }, [videoPlayerRef]);

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

  const onVideoReady = (event) => {
    try {
      if (event?.target) {
        videoPlayerRef.current = event.target;
        // Ensure the video is muted to prevent autoplay issues
        event.target.mute();
      }
    } catch (error) {
      console.error("Error in onVideoReady:", error);
      setShowVideo(false);
    }
  };

  const onVideoError = (error) => {
    console.error("YouTube player error:", error);
    setShowVideo(false);
    setIsVideoLoading(false);
    setTrailer(null); // Reset trailer on error
  };

  return (
    <div 
      ref={cardRef}
      className="w-48 pr-2 transform transition-all duration-300 hover:scale-125 hover:z-30 cursor-pointer relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowVideo(false);
        if (videoPlayerRef.current) {
          videoPlayerRef.current.pauseVideo();
        }
      }}
    >
      {/* Base Movie Card */}
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={`${TMDB_IMG_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto"
        />
        
        {/* Hover State Content */}
        {isHovered && (
          <div className="absolute inset-0">
            {/* Video Preview */}
            {showVideo && trailer?.key ? (
              <div className="w-full aspect-video">
                <YouTube
                  videoId={trailer.key}
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
                      playlist: trailer.key,
                      origin: window.location.origin,
                      enablejsapi: 1,
                    },
                  }}
                  onReady={onVideoReady}
                  onError={onVideoError}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                {isVideoLoading && <div className="text-white">Loading...</div>}
              </div>
            )}
            
            {/* Movie Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#181818] p-3 shadow-lg">
              <h3 className="text-white font-semibold mb-2 line-clamp-2">{movie.title}</h3>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center"
                >
                  <FaPlay className="text-black" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleFavourite(movie));
                  }}
                  className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center"
                >
                  <FaPlus className="text-white" />
                </button>
                <button className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center">
                  <FaThumbsUp className="text-white" />
                </button>
                <button 
                  onClick={handleOpen}
                  className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center ml-auto"
                >
                  <FaChevronDown className="text-white" />
                </button>
              </div>

              {/* Movie Meta Info */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="text-green-500 font-semibold">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
                <span>{movie.adult ? "18+" : "PG-13"}</span>
                <span>{movie.release_date?.split("-")[0]}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;