import React from 'react';
import Header from './Header';
import Footer from './Footer';

const SubscriptionSuccess = ({ success }) => {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-black w-full">
        <div className="flex-1 pt-20 pb-10 px-0 md:px-8 flex flex-col items-center justify-center">
          <div className="bg-white/10 border-2 border-blue-400 rounded-3xl shadow-2xl p-8 md:p-16 max-w-2xl w-full flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4 drop-shadow">Welcome to Premium!</h1>
            <p className="text-lg md:text-2xl text-white mb-6 text-center">Thank you for subscribing. Enjoy exclusive content, early releases, and a premium experience!</p>
            {success && (
              <div className="bg-blue-600/80 text-white rounded-lg px-6 py-3 mb-4 font-semibold shadow-lg animate-bounce">
                Subscription Activated!
              </div>
            )}
            <div className="w-full flex flex-col md:flex-row gap-8 mt-8">
              <div className="flex-1 bg-gradient-to-br from-blue-800 to-indigo-900 rounded-xl p-6 shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold text-white mb-2">Exclusive Movies</h2>
                <p className="text-white/80 mb-2">Access a handpicked collection of movies just for you.</p>
                <span className="text-5xl">🎬</span>
              </div>
              <div className="flex-1 bg-gradient-to-br from-indigo-800 to-blue-900 rounded-xl p-6 shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold text-white mb-2">Early Releases</h2>
                <p className="text-white/80 mb-2">Watch new releases before anyone else.</p>
                <span className="text-5xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SubscriptionSuccess; 