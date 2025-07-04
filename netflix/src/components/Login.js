import React, { useState } from 'react'
import Header from './Header';
import axios from "axios";
import { API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { setLoading, setUser } from '../redux/userSlice';


const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.user.isLoading);

    const loginHandler = () => {
        setIsLogin(!isLogin);
    };
    const closeAuthModal = () => setShowAuthModal(false);
    const getInputData = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        if (isLogin) {
            //login
            const user = { email, password };
            try {
                const res = await axios.post(`${API_END_POINT}/login`, user, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                }
                dispatch(setUser(res.data.user));
                // Persist user in localStorage
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate("/browse");
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                dispatch(setLoading(false));
            }
        } else {
            //register
            dispatch(setLoading(true));
            const user = { fullName, email, password };
            try {
                const res = await axios.post(`${API_END_POINT}/register`, user, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                }
                setIsLogin(true);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        setFullName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-black overflow-hidden no-scrollbar">
            <div className="absolute inset-0 -z-10">
                <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
                    alt="background"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            <Header />
            <div className="flex flex-col items-center justify-center w-full h-full mt-32 z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-6 drop-shadow-lg leading-tight">
                    Unlimited movies, TV<br className="hidden md:block" /> shows and more
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-4">
                    Starts at ₹149. Cancel at any time.
                </h2>
                <p className="text-lg text-white text-center mb-6">
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); setShowAuthModal(true); }} className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl gap-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email address"
                        className="outline-none p-4 rounded bg-gray-900 text-white placeholder-gray-400 flex-1 min-w-[220px] text-lg focus:ring-2 focus:ring-red-600"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 px-8 py-4 text-white rounded font-bold text-xl transition-colors duration-200 shadow-lg"
                    >
                        Get Started <span className="ml-2">&rarr;</span>
                    </button>
                </form>
            </div>
            {/* Modal for login/signup */}
            {showAuthModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-zinc-900 rounded-lg shadow-2xl p-8 w-full max-w-md relative">
                        <button onClick={closeAuthModal} className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
                        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">{isLogin ? "Sign In" : "Sign Up"}</h2>
                        <form onSubmit={getInputData} className="flex flex-col gap-4">
                            {!isLogin && (
                                <input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    type="text"
                                    placeholder="Full Name"
                                    className="outline-none p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-600"
                                    required
                                />
                            )}
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email address"
                                className="outline-none p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-600"
                                required
                            />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="outline-none p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-600"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 p-3 text-white rounded font-semibold text-lg transition-colors duration-200"
                            >
                                {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
                            </button>
                            <p className="text-gray-300 text-center">
                                {isLogin ? "New to Yourmovies?" : "Already have an account?"}
                                <span
                                    onClick={loginHandler}
                                    className="ml-1 text-red-400 font-bold cursor-pointer hover:underline"
                                >
                                    {isLogin ? "Sign Up" : "Sign In"}
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login