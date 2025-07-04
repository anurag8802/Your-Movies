import React, { useEffect, useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { useSelector, useDispatch } from "react-redux";
import { useBackgroundTrailerById } from '../hooks/useMovieById';
import { setBackgroundIndex } from '../redux/movieSlice';

const VideoBackground = ({ movieList, movieId }) => {
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);
    const backgroundTrailer = useSelector(store => store.movie.backgroundTrailer);
    const backgroundIndex = useSelector(store => store.movie.backgroundIndex);
    let currentMovieId = movieId;
    if (movieList && movieList.length > 0) {
        currentMovieId = movieList[currentIndex]?.id;
    }
    useBackgroundTrailerById(currentMovieId);

    const pauseTimeoutRef = useRef();

    // Sync currentIndex with backgroundIndex from Redux
    useEffect(() => {
        if (typeof backgroundIndex === 'number' && movieList && movieList.length > 0) {
            setCurrentIndex(backgroundIndex % movieList.length);
        }
    }, [backgroundIndex, movieList]);

    useEffect(() => {
        if (!movieList || movieList.length === 0) return;
        const timer = setTimeout(() => {
            try {
                const nextIndex = (currentIndex + 1) % movieList.length;
                setCurrentIndex(nextIndex);
                dispatch(setBackgroundIndex(nextIndex));
            } catch (e) {
                console.error('Error cycling video background:', e);
            }
        }, 10000); // 10 seconds
        return () => clearTimeout(timer);
    }, [currentIndex, movieList, dispatch]);

    const onReady = (event) => {
        const player = event.target;
        const duration = player.getDuration();
        // Stop the video 10 seconds before the end
        if (duration > 10) {
            pauseTimeoutRef.current = setTimeout(() => {
                try {
                    if (player && player.getIframe && player.getIframe()) {
                        player.pauseVideo();
                    }
                } catch (e) {
                    console.error('Error pausing video:', e);
                }
            }, (duration - 10) * 1000);
        }
    };

    useEffect(() => {
        // Cleanup pause timeout on unmount or when video changes
        return () => {
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current);
            }
        };
    }, [backgroundTrailer?.key]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', aspectRatio: '16/9' }}>
            {backgroundTrailer?.key && (
                <YouTube
                    videoId={backgroundTrailer.key}
                    containerClassName="w-full h-full"
                    className="w-full h-full"
                    opts={{
                        width: '100%',
                        height: '100%',
                        playerVars: {
                            autoplay: 1,
                            mute: 1,
                            controls: 1,
                            modestbranding: 1,
                            rel: 0,
                            showinfo: 0,
                        }
                    }}
                    onReady={onReady}
                />
            )}
        </div>
    );
};

export default VideoBackground;