import React from 'react';
import { CiPlay1 } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setSelectedMovie, getId, setOpen } from '../redux/movieSlice';
import { addToContinueWatching } from '../redux/continueWatchingSlice';

const VideoTitle = ({title, overview, movie}) => {
    const dispatch = useDispatch();
    const truncate = (str, n) => (str?.length > n ? str.substr(0, n - 1) + "..." : str);

    const handleOpenDialog = () => {
        if (movie) {
            dispatch(setSelectedMovie(movie));
            dispatch(getId(movie.id));
            dispatch(setOpen(true));
            dispatch(addToContinueWatching(movie));
        }
    };

    return (
        <div className='w-full max-w-xl text-white pt-8 md:pt-24 px-4 md:px-0'>
            <h1 className='text-3xl md:text-5xl font-extrabold drop-shadow-lg mb-6 break-words leading-tight max-w-full'>
                {title}
            </h1>
            <p className='w-full md:w-2/3 text-lg md:text-xl mb-8 text-shadow-lg'>{truncate(overview, 220)}</p>
            <div className='flex gap-4'>
                <button className='flex items-center px-8 py-3 bg-white text-black rounded-md text-lg font-bold hover:bg-opacity-80 transition-all duration-200 shadow-lg' onClick={handleOpenDialog}>
                    <CiPlay1 size="28px" />
                    <span className='ml-2'>Play</span>
                </button>
                <button className='flex items-center px-8 py-3 bg-gray-700 bg-opacity-70 text-white rounded-md text-lg font-bold hover:bg-opacity-90 transition-all duration-200 shadow-lg' onClick={handleOpenDialog}>
                    <CiCircleInfo size="28px" />
                   <span className='ml-2'>More Info</span> 
                </button>
            </div>
        </div>
    )
}

export default VideoTitle