import React from 'react'
import MovieList from './MovieList';
import {useSelector} from "react-redux";
import useActionMovies from '../hooks/useActionMovies';
import useHorrorMovies from '../hooks/useHorrorMovies';
import useTop10HindiMovies from '../hooks/useTop10HindiMovies';
import useThrillerMovies from '../hooks/useThrillerMovies';
import useCrimeMovies from '../hooks/useCrimeMovies';
import useRomanceMovies from '../hooks/useRomanceMovies';
import useInspirationalMovies from '../hooks/useInspirationalMovies';
import useMarvelMovies from '../hooks/useMarvelMovies';
import useFamilyMovies from '../hooks/useFamilyMovies';
import usePopularKidMovies from '../hooks/usePopularKidMovies';

const MovieContainer = () => {
  const movie = useSelector(store=>store.movie);
  useActionMovies();
  useHorrorMovies();
  useTop10HindiMovies();
  useThrillerMovies();
  useCrimeMovies();
  useRomanceMovies();
  useInspirationalMovies();
  useMarvelMovies();
  useFamilyMovies();
  usePopularKidMovies();

  const actionMovies = useSelector(store => store.movie.actionMovies);
  const horrorMovies = useSelector(store => store.movie.horrorMovies);
  const top10HindiMovies = useSelector(store => store.movie.top10HindiMovies);
  const thrillerMovies = useSelector(store => store.movie.thrillerMovies);
  const crimeMovies = useSelector(store => store.movie.crimeMovies);
  const romanceMovies = useSelector(store => store.movie.romanceMovies);
  const inspirationalMovies = useSelector(store => store.movie.inspirationalMovies);
  const marvelMovies = useSelector(store => store.movie.marvelMovies);
  const familyMovies = useSelector(store => store.movie.familyMovies);
  const popularKidMovies = useSelector(store => store.movie.popularKidMovies);

  return (
    <div className='bg-gradient-to-b from-transparent to-black pb-16 pt-8'>
      <div className='-mt-24 relative z-10 space-y-14' >
        <MovieList title={"Popular Movies"} movies={movie.popularMovie}/>
        <MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovies}/>
        <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies}/>
        <MovieList title={"Action Movies"} movies={actionMovies}/>
        <MovieList title={"Horror Movies"} movies={horrorMovies}/>
        <MovieList title={"Top 10 Movies - Hindi"} movies={top10HindiMovies} numbered={true}/>
        <MovieList title={"Thriller Movies"} movies={thrillerMovies}/>
        <MovieList title={"Crime Movies"} movies={crimeMovies}/>
        <MovieList title={"Romance Movies"} movies={romanceMovies}/>
        <MovieList title={"Inspirational Movies"} movies={inspirationalMovies}/>
        <MovieList title={"Marvel Movies"} movies={marvelMovies}/>
        <MovieList title={"Family Movies"} movies={familyMovies}/>
        <MovieList title={"Popular Kid Movies"} movies={popularKidMovies}/>
      </div>
    </div>
  )
}

export default MovieContainer