import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { FaSearch, FaTh, FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser, setSubscriptionStatus } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ onSignInClick }) => {
    const user = useSelector((store) => store.user.user);
    const subscriptionStatus = useSelector((store) => store.user.subscriptionStatus);
    const [searchMovie, setSearchMovie] = useState("");
    const isLoading = useSelector(store => store.user.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [expanded, setExpanded] = useState('');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const timeoutRef = useRef(null);

    const handleProfileMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowProfileDropdown(true);
    };

    const handleProfileMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowProfileDropdown(false);
        }, 800); // 800ms delay before hiding
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            localStorage.removeItem('subscriptionStatus');
            dispatch(setSubscriptionStatus(false));
            navigate("/");
        } catch (error) {
            toast.error('Logout failed');
        }
    };
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent px-4 md:px-8 py-3 flex items-center justify-between shadow-lg">
            {/* Left: Brand and Nav */}
            <div className="flex items-center gap-4 md:gap-8 w-full">
                {/* Brand */}
                <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight select-none cursor-pointer" onClick={() => navigate('/browse')}>
                    your<span className="text-red-800">movies</span>
                </span>
                {/* Hamburger for mobile */}
                <button className="md:hidden ml-auto text-white text-2xl focus:outline-none" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                    {mobileNavOpen ? <FaTimes /> : <FaBars />}
                </button>
                {/* Nav Links - Desktop */}
                <nav className="hidden md:flex items-center gap-2 md:gap-4 text-white font-semibold text-base md:text-lg">
                    <button className="hover:text-red-800 px-2 md:px-3 py-1 focus:outline-none cursor-pointer" onClick={() => navigate('/browse')}>Home</button>
                    <button className="hover:text-red-800 px-2 md:px-3 py-1 focus:outline-none cursor-pointer" onClick={() => navigate('/movies')}>Movies</button>
                    {/* Category Dropdown */}
                    <div className="relative">  
                        <button className="flex items-center gap-1 hover:text-red-800 px-2 md:px-3 py-1" onClick={() => setCategoryOpen((prev) => !prev)}>
                            Category <FaChevronDown className={`ml-1 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {categoryOpen && (
                            <div className="absolute left-0 mt-2 w-56 bg-black border border-zinc-800 rounded-lg shadow-lg z-50 text-white text-base font-semibold py-2">
                                {/* Accordion style categories */}
                                <button className="flex items-center w-full px-4 py-2 hover:bg-zinc-900 focus:outline-none hover:text-red-800" onClick={() => {navigate('/category/top-rated'); setCategoryOpen(false);}}>
                                    <FaChevronRight className="mr-2 text-xs" /> Top Rated
                                </button>
                                <button className="flex items-center w-full px-4 py-2 hover:bg-zinc-900 focus:outline-none hover:text-red-800" onClick={() => {navigate('/category/bollywood'); setCategoryOpen(false);}}>
                                    <FaChevronRight className="mr-2 text-xs" /> Bollywood Movies
                                </button>
                                <button className="flex items-center w-full px-4 py-2 hover:bg-zinc-900 focus:outline-none hover:text-red-800" onClick={() => {navigate('/category/hollywood'); setCategoryOpen(false);}}>
                                    <FaChevronRight className="mr-2 text-xs" /> Hollywood
                                </button>
                                <button className="flex items-center w-full px-4 py-2 hover:bg-zinc-900 focus:outline-none hover:text-red-800" onClick={() => {navigate('/category/south-indian'); setCategoryOpen(false);}}>
                                    <FaChevronRight className="mr-2 text-xs" /> South Indian
                                </button>
                                <button className="flex items-center w-full px-4 py-2 hover:bg-zinc-900 focus:outline-none hover:text-red-800" onClick={() => {navigate('/category/punjabi'); setCategoryOpen(false);}}>
                                    <FaChevronRight className="mr-2 text-xs" /> Punjabi
                                </button>
                            </div>
                        )}
                    </div>
                    <Link to="/browse/history" className="text-white hover:text-red-800 transition-colors px-3 md:px-4 py-2 ">History</Link>
                    <Link to="/browse/favourite" className="text-white hover:text-red-800 transition-colors px-3 md:px-4 py-2">Favourites</Link>
                    <span className="mx-2 text-gray-500">|</span>
                    <button className={`flex items-center gap-1 hover:text-red-800 font-bold px-2 py-1 ${subscriptionStatus ? 'text-blue-500' : 'text-white'} `} onClick={() => {
                        if (subscriptionStatus) {
                            navigate('/subscription/success');
                        } else {
                            navigate('/browse/subscription');
                        }
                    }}>
                        <span className="text-lg">+</span> Subscriptions
                    </button>
                </nav>
            </div>
            {/* Mobile Nav Drawer */}
            {mobileNavOpen && (
                <div className="fixed inset-0 z-40 bg-black/80 flex flex-col md:hidden">
                    <div className="flex flex-col items-center gap-6 pt-24 pb-8 w-full">
                        
                        <button className="w-11/12 text-left px-4 py-3 rounded-lg hover:bg-red-800 text-white font-bold text-lg" onClick={() => {navigate('/browse'); setMobileNavOpen(false);}}>Home</button>
                        <button className="w-11/12 text-left px-4 py-3 rounded-lg hover:bg-red-800 text-white font-bold text-lg" onClick={() => setMobileNavOpen(false)}>Movies</button>
                        <button className="w-11/12 text-left px-4 py-3 rounded-lg hover:bg-red-800 text-white font-bold text-lg" onClick={() => setMobileNavOpen(false)}> Category </button>
                        <Link to="/browse/history" className="w-11/12 block px-4 py-3 rounded-lg hover:bg-red-800 text-white font-bold text-lg" onClick={() => setMobileNavOpen(false)}>History</Link>
                        <Link to="/browse/favourite" className="w-11/12 block px-4 py-3 rounded-lg hover:bg-red-800 text-white font-bold text-lg" onClick={() => setMobileNavOpen(false)}>Favourites</Link>
                        <button className={`w-11/12 flex items-center gap-1 px-4 py-3 rounded-lg font-bold text-lg ${subscriptionStatus ? 'text-blue-500' : 'text-white'}`} onClick={() => {
                            if (subscriptionStatus) {
                                navigate('/subscription/success');
                            } else {
                                navigate('/browse/subscription');
                            }
                            setMobileNavOpen(false);
                        }}>
                            <span className="text-lg">+</span> Subscriptions
                        </button>
                        {user && (
                            <button className="w-11/12 text-left px-4 py-3 rounded-lg bg-red-800 text-white font-bold text-lg mt-4" onClick={() => {logoutHandler(); setMobileNavOpen(false);}}>Logout</button>
                        )}
                    </div>
                </div>
            )}
            {/* Right: Icons and Profile */}
            <div className="flex items-center gap-4 md:gap-6 ml-2 md:ml-0">
                {/* Search Icon */}
                <button className="text-white text-xl hover:text-red-800 focus:outline-none" onClick={() => navigate('/search')}>
                    <FaSearch />
                </button>
                {/* Grid Icon */}
                <button
                    className="text-white text-xl hover:text-red-800 focus:outline-none relative"
                    onClick={() => setShowDropdownMenu((prev) => !prev)}
                >
                    <FaTh />
                    {showDropdownMenu && (
                        <DropdownMenu onClose={() => setShowDropdownMenu(false)} />
                    )}
                </button>
                {/* Profile Avatar */}
                {user && (
                    <div 
                        className="relative"
                        onMouseEnter={handleProfileMouseEnter}
                        onMouseLeave={handleProfileMouseLeave}
                    >
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'U')}&background=ff0000&color=fff`}
                                alt="Profile"
                                className="w-8 h-8 rounded"
                            />
                            <IoIosArrowDropdown className="text-white text-lg" />
                        </div>
                        <div className={`${showProfileDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300 ease-in-out`}>
                            <ProfileDropdown user={user} onClose={() => setShowProfileDropdown(false)} />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;