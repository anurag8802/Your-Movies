import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import Body from "./components/Body";
import { Toaster } from 'react-hot-toast'; 
import MovieDialog from "./components/MovieDialog";
import Login from './components/Login';
import Browse from './components/Browse';
import Profile from './components/Profile';
import History from './components/History';
import Subscription from './components/Subscription';
import Favourite from './components/Favourite';
import SearchResults from './components/SearchResults';
import GenrePage from './components/GenrePage';
import Footer from './components/Footer';
import axios from 'axios';
import { options, TMDB_IMG_URL, Now_Playing_Movie, Popular_Movie, Top_Rated_Movie, Upcoming_Movie } from './utils/constant';

// Map collection names to TMDB endpoints
const COLLECTION_ENDPOINTS = {
  'home-premiere': Now_Playing_Movie,
  'new-releases': Upcoming_Movie,
  'critically-acclaimed': Top_Rated_Movie,
  'kids': Popular_Movie, // Example: you can use a more specific endpoint if needed
};

const CollectionPage = () => {
  const { collectionName } = useParams();
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const endpoint = COLLECTION_ENDPOINTS[collectionName?.toLowerCase()];

  React.useEffect(() => {
    if (!endpoint) {
      setError('Collection not supported.');
      setMovies([]);
      setLoading(false);
      return;
    }
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(endpoint, options);
        setMovies(res.data.results || []);
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [endpoint, collectionName]);

  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-neutral-900 to-black w-full">
        <div className="flex-1 pt-20 pb-10 px-0 md:px-8">
          <h1 className="text-4xl font-bold text-white mb-8 capitalize">{collectionName?.replace(/-/g, ' ')}</h1>
          {loading && <div className="text-white">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map(movie => (
              <div key={movie.id} className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <img src={movie.poster_path ? TMDB_IMG_URL + movie.poster_path : ''} alt={movie.title} className="w-full h-60 object-cover" />
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h2 className="text-lg font-semibold text-white mb-2">{movie.title}</h2>
                </div>
              </div>
            ))}
          </div>
          {!loading && movies.length === 0 && !error && (
            <div className="text-white text-xl mt-8">No movies found for this collection.</div>
          )}
        </div>
        <Footer />
      </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/browse/history" element={<History />} />
        <Route path="/browse/subscription" element={<Subscription />} />
        <Route path="/browse/favourite" element={<Favourite />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/genre/:genreName" element={<GenrePage />} />
        <Route path="/collection/:collectionName" element={<CollectionPage />} />
        {/* Add other routes as needed */}
      </Routes>
      <Toaster/>  
      <MovieDialog/>
    </>
  );
}

export default App;