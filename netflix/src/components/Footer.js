import React from 'react';

const Footer = () => (
  <footer className="w-full bg-black bg-opacity-90 text-neutral-400 py-6 sm:py-8 px-2 sm:px-4 mt-8 border-t border-neutral-800">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-2 sm:gap-4">
      <div className="text-base sm:text-lg font-bold text-red-600 mb-1 md:mb-0">YOURMOVIES</div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
        <a href="#" className="hover:text-white transition">FAQ</a>
        <a href="#" className="hover:text-white transition">Help Center</a>
        <a href="#" className="hover:text-white transition">Terms of Use</a>
        <a href="#" className="hover:text-white transition">Privacy</a>
        <a href="#" className="hover:text-white transition">Cookie Preferences</a>
        <a href="#" className="hover:text-white transition">Corporate Information</a>
      </div>
      <div className="text-xs mt-1 md:mt-0 text-center">&copy; {new Date().getFullYear()} YOURMOVIES. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer; 