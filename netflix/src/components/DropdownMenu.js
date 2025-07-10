import React from 'react';
import { Link } from 'react-router-dom';

const genres = [
  { name: 'Action and adventure', path: 'action-and-adventure' },
  { name: 'Anime', path: 'anime' },
  { name: 'Comedy', path: 'comedy' },
  { name: 'Documentary', path: 'documentary' },
  { name: 'Drama', path: 'drama' },
  { name: 'Fantasy', path: 'fantasy' },
  { name: 'Horror', path: 'horror' },
  { name: 'Kids', path: 'kids' },
  { name: 'Mystery and thrillers', path: 'mystery-and-thrillers' },
  { name: 'Romance', path: 'romance' },
  { name: 'Science fiction', path: 'science-fiction' },
];

const collections = [
  { name: 'Home Premiere', path: 'home-premiere' },
  { name: 'New Releases', path: 'new-releases' },
  { name: 'MX Player', path: 'mx-player', external: true, url: 'https://www.mxplayer.in/' },
  { name: 'Critically acclaimed', path: 'critically-acclaimed' },
  { name: 'Kids', path: 'kids' },
];

const DropdownMenu = ({ onClose }) => (
  <div className="absolute right-0 mt-2 w-full max-w-xs sm:max-w-md md:w-[500px] bg-zinc-900 rounded-lg shadow-lg z-50 p-4 sm:p-6 flex flex-col sm:flex-row" onClick={e => e.stopPropagation()}>
    <div className="flex-1 sm:pr-6 mb-4 sm:mb-0">
      <div className="text-gray-400 mb-2 text-xs sm:text-base">GENRES</div>
      {genres.map(g => (
        <Link
          key={g.path}
          to={`/genre/${g.path}`}
          className="block text-white font-semibold py-1 text-sm sm:text-base hover:underline"
          onClick={onClose}
        >
          {g.name}
        </Link>
      ))}
    </div>
    <div className="flex-1 border-t sm:border-t-0 sm:border-l border-gray-700 pt-4 sm:pt-0 sm:pl-6">
      <div className="text-gray-400 mb-2 text-xs sm:text-base">FEATURED COLLECTIONS</div>
      {collections.map(c => (
        c.external ? (
          <a
            key={c.path}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white font-semibold py-1 text-sm sm:text-base hover:underline"
            onClick={onClose}
          >
            {c.name}
          </a>
        ) : (
          <Link
            key={c.path}
            to={`/collection/${c.path}`}
            className="block text-white font-semibold py-1 text-sm sm:text-base hover:underline"
            onClick={onClose}
          >
            {c.name}
          </Link>
        )
      ))}
    </div>
  </div>
);

export default DropdownMenu; 