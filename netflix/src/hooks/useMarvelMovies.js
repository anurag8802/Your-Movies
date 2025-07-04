import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Marvel_Movie } from '../utils/constant';
import { getMarvelMovies } from '../redux/movieSlice';

const useMarvelMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMarvelMovies = async () => {
            try {
                const res = await axios.get(Marvel_Movie, options);
                dispatch(getMarvelMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchMarvelMovies();
    }, [dispatch]);
};

export default useMarvelMovies; 