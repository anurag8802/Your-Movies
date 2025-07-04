import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies,searchMovie=false, numbered = false }) => {

    return (
        <div className='px-8 py-4'>
            <div className='flex items-center mb-4'>
                <div className='w-1.5 h-8 bg-red-600 rounded mr-3'></div>
                <h1 className={`${searchMovie ? "text-black" : "text-white"} text-3xl font-extrabold drop-shadow-lg tracking-tight`}>{title}</h1>
            </div>
            <div className='flex overflow-x-auto no-scrollbar gap-4 transition-all duration-300 pb-2 shadow-lg rounded-lg bg-black/30'>
                <div className='flex items-center gap-4'>
                    {
                       movies?.map((movie, idx) => { 
                            return (
                                <div key={movie.id} className='relative'>
                                  {numbered && idx < 10 && (
                                    <span className='absolute -left-6 bottom-2 text-[6rem] font-extrabold text-white/80 drop-shadow-lg z-10 select-none pointer-events-none'>{idx + 1}</span>
                                  )}
                                  <MovieCard movie={movie} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieList