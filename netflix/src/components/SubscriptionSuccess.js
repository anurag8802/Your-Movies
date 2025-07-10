import React from 'react';
import Header from './Header';
import Footer from './Footer';

const SubscriptionSuccess = ({ success }) => {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-black w-full">
        <div className="flex-1 pt-16 sm:pt-20 pb-6 sm:pb-10 px-2 sm:px-4 md:px-8 flex flex-col items-center justify-center">
          <div className="bg-white/10 border-2 border-blue-400 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 md:p-16 max-w-full md:max-w-2xl w-full flex flex-col items-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-blue-400 mb-2 sm:mb-4 drop-shadow text-center">Welcome to Premium!</h1>
            <p className="text-base sm:text-lg md:text-2xl text-white mb-4 sm:mb-6 text-center">Thank you for subscribing. Enjoy exclusive content, early releases, and a premium experience!</p>
            {success && (
              <div className="bg-blue-600/80 text-white rounded-lg px-4 sm:px-6 py-2 sm:py-3 mb-3 sm:mb-4 font-semibold shadow-lg animate-bounce text-center">
                Subscription Activated!
              </div>
            )}
            <div className="w-full flex flex-col md:flex-row gap-4 sm:gap-8 mt-6 sm:mt-8">
              <div className="flex-1 bg-gradient-to-br from-blue-800 to-indigo-900 rounded-xl p-4 sm:p-6 shadow-lg flex flex-col items-center">
                <h2 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">Exclusive Movies</h2>
                <p className="text-white/80 mb-1 sm:mb-2 text-sm sm:text-base text-center">Access a handpicked collection of movies just for you.</p>
                <span className="text-3xl sm:text-5xl">🎬</span>
              </div>
              <div className="flex-1 bg-gradient-to-br from-indigo-800 to-blue-900 rounded-xl p-4 sm:p-6 shadow-lg flex flex-col items-center">
                <h2 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">Early Releases</h2>
                <p className="text-white/80 mb-1 sm:mb-2 text-sm sm:text-base text-center">Watch new releases before anyone else.</p>
                <span className="text-3xl sm:text-5xl">🚀</span>
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