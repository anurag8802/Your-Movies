import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { FaUser, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const ProfileDropdown = ({ user, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await axios.get(`${API_END_POINT}/logout`, { withCredentials: true });
      dispatch(setUser(null));
      navigate('/');
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-black bg-opacity-90 border border-gray-700 rounded-md shadow-lg z-50 opacity-100 transition-all duration-300 ease-in-out transform">
      <div className="py-2">
        {/* Profile Section */}
        <div className="px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded" />
            ) : (
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white">
                {user.fullName?.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{user.fullName}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white group"
            onClick={onClose}
          >
            <FaUser className="mr-3 text-gray-400 group-hover:text-white" />
            Account
          </Link>
          <Link
            to="/help-center"
            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white group"
            onClick={onClose}
          >
            <FaQuestionCircle className="mr-3 text-gray-400 group-hover:text-white" />
            Help Centre
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white group"
          >
            <FaSignOutAlt className="mr-3 text-gray-400 group-hover:text-white" />
            Sign out of Netflix
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
