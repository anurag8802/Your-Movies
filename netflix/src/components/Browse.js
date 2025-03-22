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

const Browse = () => {
    //useSelector is a hook provided by React-Redux that allows you to extract data (or a piece of the state) from the Redux store in a React component.
    //From store.app, it selects the user property (store.app.user), which represents the current user information in the state.
    const user = useSelector(store => store.app.user);
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
    }, []); //The empty dependency array ([]) means this effect runs only once when the component mounts.
    return (
        <div >
            <Header />
            <div>
                {
                    toggle ? <SearchMovie /> : (
 // The use of <>...</> (React Fragment) around <MainContainer /> and <MovieContainer /> 
//  allows these elements to be grouped together without adding an extra node to the DOM.
                        <>
                            <MainContainer />
                            <MovieContainer />
                        </>

                    )
                }

            </div>
        </div>
    )
}

export default Browse