import React, { useEffect } from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground';
import {useSelector, useDispatch} from "react-redux";
import { setSelectedMovie } from '../redux/movieSlice';
import ContinueWatching from './ContinueWatching';

const MainContainer = () => {
  const movie = useSelector(store=>store.movie?.nowPlayingMovies);
  const selectedMovie = useSelector(store=>store.movie?.selectedMovie);
  const dispatch = useDispatch();
  
  // Set initial selected movie when component mounts
  useEffect(() => {
    if (movie && !selectedMovie) {
      dispatch(setSelectedMovie(movie[4]));
    }
  }, [movie, selectedMovie, dispatch]);
  
  if(!movie) return null; // early return in react
 
  // Use selected movie if available, otherwise fall back to static movie[4]
  const displayMovie = selectedMovie || movie[4];
  const {overview, id, title} = displayMovie;
  
  return (
    <>
      <ContinueWatching />
      <div className="relative h-[70vh] flex items-end justify-start bg-gradient-to-b from-black/80 to-transparent pt-32 pb-32 overflow-hidden">
        {/* Video background absolutely fills the parent */}
        <div className="absolute inset-0 w-full h-full z-0">
          <VideoBackground movieList={movie} />
        </div>
        {/* Overlay for gradient effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 to-transparent z-10"></div>
        {/* Video title and description, positioned above video */}
        <div className="relative z-20 p-12 max-w-2xl">
          <VideoTitle title={title} overview={overview} movie={displayMovie}/>
        </div>
      </div>
    </>
  )
}

export default MainContainer