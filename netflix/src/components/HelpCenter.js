import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HelpCenter = () => {
    const user = useSelector(store => store.user.user);
    const [searchQuery, setSearchQuery] = useState('');

    const recommendedTopics = [
        {
            title: 'How to keep your account secure',
            link: '/help/account-security'
        },
        {
            title: 'Parental controls on YOUR MOVIES',
            link: '/help/parental-controls'
        },
        {
            title: 'How to change your plan',
            link: '/help/change-plan'
        }
    ];

    const topics = [
        {
            title: 'Getting Started',
            items: ['Sign up for YOUR MOVIES', 'Billing and Payments', 'Watching YOUR MOVIES', 'Plans and Pricing']
        },
        {
            title: 'Can\'t Watch',
            items: ['How to fix streaming issues', 'YOUR MOVIES not working', 'Playback problems', 'Error codes']
        },
        {
            title: 'Manage My Account',
            items: ['Account Settings', 'Billing and Payments', 'Change Email', 'Change Password']
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Link to="/browse" className="text-2xl font-bold text-red-600">
                                YOUR MOVIES
                            </Link>
                            <span className="ml-4 text-xl">Help Center</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {user && (
                                <div className="flex items-center gap-2">
                                    <img 
                                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}`} 
                                        alt="Profile" 
                                        className="w-8 h-8 rounded"
                                    />
                                    <span>{user.fullName}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                {/* Search Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-8">How can we help?</h1>
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Type a question, topic or issue"
                                className="w-full pl-12 pr-4 py-3 border-2 border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Recommended Topics */}
                <div className="mb-12">
                    <p className="text-gray-600 mb-4">Recommended for you:</p>
                    <div className="space-y-2">
                        {recommendedTopics.map((topic, index) => (
                            <Link
                                key={index}
                                to={topic.link}
                                className="text-gray-700 hover:underline block"
                            >
                                {topic.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Explore Topics */}
                <div>
                    <h2 className="text-xl font-bold mb-6 text-center">Explore Topics</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {topics.map((topic, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="font-bold mb-4">{topic.title}</h3>
                                <ul className="space-y-2">
                                    {topic.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            <Link to={`/help/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-red-600 hover:underline">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HelpCenter;
