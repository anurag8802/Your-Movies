import React, { useEffect } from 'react'
import Header from './Header';
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import SearchMovie from './SearchMovie';
import MovieDialog from './MovieDialog';
import Footer from './Footer';
import { setOpen } from '../redux/movieSlice';

const Browse = () => {
    const user = useSelector(store => store.user.user);
    //This toggle value might be used to switch between different views on the page (e.g., between the search results and movie lists).
    const toggle = useSelector(store => store.movie.toggle);
    const selectedMovie = useSelector(store => store.movie.selectedMovie);
    const isDialogOpen = useSelector(store => store.movie.open);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //custom hooks
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    useEffect(() => {
        if (!user) {
            navigate("/"); //If there is no user, it redirects the user to the login page.
        }
    }, [navigate, user]); // Add dependencies
    return (
        <div>
            <Header />
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-neutral-900 to-black w-full">
            <div className="flex-1 pt-20 pb-10 px-0 md:px-8">
                {toggle ? <SearchMovie /> : (
                    <div className="w-full">
                        <MainContainer />
                        <MovieContainer />
                    </div>
                )}
            </div>
            <Footer />
            {/* Movie Dialog for pop-up trailers */}
            {isDialogOpen && selectedMovie && (
              <MovieDialog 
                movie={selectedMovie} 
                onClose={() => dispatch(setOpen(false))} 
              />
            )}
        </div>
        </div>
    )
}

export default Browse