import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import {useSelector,useDispatch} from "react-redux" 
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useLocation } from "react-router-dom";

const Header = ({ onSignInClick }) => { 
    const user = useSelector((store)=>store.user.user);
    const toggle = useSelector(store=>store.movie.toggle);
    const [searchMovie, setSearchMovie] = React.useState("");
    const isLoading = useSelector(store => store.user.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLandingPage = location.pathname === "/";

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if(res.data.success){
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            localStorage.removeItem('user');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const toggleHandler = () => {
        dispatch(setToggle());
    }

    const searchHandler = async (e) => {
        e.preventDefault();
        if (!searchMovie.trim()) return;
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
            navigate('/search'); // Go to search results page
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie("");
    };
 
    return (
        <div className='absolute z-10 flex w-full items-center justify-between px-6 pt-6 bg-gradient-to-b from-black'>
            {/* Custom Yourmovies logo styled like Netflix */}
            <h1
                className='text-5xl font-extrabold text-red-600 font-sans tracking-tight drop-shadow-lg select-none'
                
            >
                Yourmovies
            </h1>
            <div className='flex items-center'>
                {user && !isLandingPage && (
                    <>
                        <IoIosArrowDropdown size="24px" color='white' />
                        <h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
                        <div className='ml-4 flex items-center gap-2'>
                            <button onClick={logoutHandler} className="flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 text-white font-bold px-5 py-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                </svg>
                                Logout
                            </button>
                            {/* Restored search bar in header, triggers search on submit */}
                            <form onSubmit={searchHandler} className="ml-2">
                                <input
                                    type="text"
                                    value={searchMovie}
                                    onChange={e => setSearchMovie(e.target.value)}
                                    placeholder="Search movies..."
                                    className="px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-600 outline-none border-2 border-red-800"
                                />
                                <button type="submit" className=" text-white px-4 py-2 ml-2 rounded">{isLoading ? "Loading..." : ""}</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header