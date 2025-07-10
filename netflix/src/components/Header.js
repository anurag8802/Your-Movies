import React, { useState } from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { FaSearch, FaTh } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';

const Header = ({ onSignInClick }) => {
    const user = useSelector((store) => store.user.user);
    const [searchMovie, setSearchMovie] = useState("");
    const isLoading = useSelector(store => store.user.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLandingPage = location.pathname === "/";
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            navigate("/");
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    const searchHandler = async (e) => {
        e.preventDefault();
        if (!searchMovie.trim()) return;
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
            navigate('/search');
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie("");
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent px-8 py-3 flex items-center justify-between shadow-lg">
            {/* Left: Brand and Nav */}
            <div className="flex items-center gap-8">
                {/* Brand */}
                <span className="text-2xl font-extrabold text-white tracking-tight select-none cursor-pointer" onClick={() => navigate('/browse')}>
                    your<span className="text-red-600">movies</span>
                </span>
                {/* Nav Links */}
                <nav className="flex items-center gap-2 md:gap-4 text-white font-semibold text-lg">
                    <button className="px-4 py-1 rounded-lg bg-white/10 text-white shadow-inner font-bold focus:outline-none" onClick={() => navigate('/browse')}>Home</button>
                    <button className="hover:text-red-400 px-3 py-1">Movies</button>
                    <button className="hover:text-red-400 px-3 py-1">Live TV</button>
                    <Link to="/browse/history" className="text-white hover:text-red-500 transition-colors px-4 py-2 ">History</Link>
                    <Link to="/browse/favourite" className="text-white hover:text-red-500 transition-colors px-4 py-2">Favourites</Link>
                    <span className="mx-2 text-gray-500">|</span>
                    <button className="flex items-center gap-1 text-white font-bold px-2 py-1" onClick={() => navigate('/browse/subscription')}>
                        <span className="text-lg">+</span> Subscriptions
                    </button>
                </nav>
            </div>
            {/* Right: Icons and Profile */}
            <div className="flex items-center gap-6">
                {/* Search Icon */}
                <button className="text-white text-xl hover:text-red-400 focus:outline-none" onClick={() => navigate('/search')}>
                    <FaSearch />
                </button>
                {/* Grid Icon */}
                <button
                    className="text-white text-xl hover:text-red-400 focus:outline-none relative"
                    onClick={() => setShowDropdownMenu((prev) => !prev)}
                >
                    <FaTh />
                    {showDropdownMenu && (
                        <DropdownMenu onClose={() => setShowDropdownMenu(false)} />
                    )}
                </button>
                {/* Profile Avatar */}
                {user && (
                    <div className="relative group">
                        <img
                            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'U')}&background=ff0000&color=fff`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-red-600 object-cover cursor-pointer"
                            onClick={() => navigate('/profile')}
                        />
                        {/* Dropdown for logout */}
                        <div className="absolute right-0 mt-2 w-32 bg-zinc-900 rounded shadow-lg py-2 z-50 hidden group-hover:block">
                            <button onClick={() => navigate('/profile')} className="block w-full text-left px-4 py-2 hover:bg-zinc-800">Profile</button>
                            <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 hover:bg-zinc-800 text-red-500">Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;