import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/userSlice';
import toast from 'react-hot-toast';
import Header from './Header';

const Profile = () => {
    const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Profile form state
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        fetchProfile();
    }, [user, navigate]);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/profile`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                setFullName(res.data.user.fullName);
                setAvatar(res.data.user.avatar || '');
            }
        } catch (error) {
            toast.error('Failed to fetch profile');
            console.error(error);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await axios.put(`${API_END_POINT}/profile`, 
                { fullName, avatar }, 
                { withCredentials: true }
            );
            
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(res.data.user));
                setIsEditing(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900">
            <Header />
            
            <div className="pt-24 px-6 max-w-4xl mx-auto">
                <div className="bg-zinc-900 rounded-lg shadow-2xl p-8 relative">
                    {/* Cross button to close profile */}
                    <button 
                        onClick={() => navigate('/browse')}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold transition-colors"
                    >
                        ×
                    </button>
                    
                    <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>
                    
                    {/* Profile Information */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded font-medium transition-colors"
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        
                        {isEditing ? (
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full p-3 bg-gray-800 text-white rounded focus:ring-2 focus:ring-red-600 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Avatar URL (optional)</label>
                                    <input
                                        type="url"
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                        className="w-full p-3 bg-gray-800 text-white rounded focus:ring-2 focus:ring-red-600 outline-none"
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 px-6 py-3 text-white rounded font-medium transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Full Name</label>
                                    <p className="text-white text-lg">{user.fullName}</p>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Email</label>
                                    <p className="text-white text-lg">{user.email}</p>
                                </div>
                                {user.avatar && (
                                    <div>
                                        <label className="block text-gray-300 mb-2">Avatar</label>
                                        <img 
                                            src={user.avatar} 
                                            alt="Profile" 
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-gray-300 mb-2">Member Since</label>
                                    <p className="text-white text-lg">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                {user.lastLogin && (
                                    <div>
                                        <label className="block text-gray-300 mb-2">Last Login</label>
                                        <p className="text-white text-lg">
                                            {new Date(user.lastLogin).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 