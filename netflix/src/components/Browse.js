import React, { useEffect } from 'react'
import Header from './Header';
import { useSelector} from "react-redux";
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

const Browse = () => {
    //useSelector is a hook provided by React-Redux that allows you to extract data (or a piece of the state) from the Redux store in a React component.
    //From store.user, it selects the user property (store.user.user), which represents the current user information in the state.
    const user = useSelector(store => store.user.user);
    //This toggle value might be used to switch between different views on the page (e.g., between the search results and movie lists).
    const toggle = useSelector(store => store.movie.toggle);
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
            <MovieDialog />
        </div>
        </div>
    )
}

export default Browse