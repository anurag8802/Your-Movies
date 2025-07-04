import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Thriller_Movie } from '../utils/constant';
import { getThrillerMovies } from '../redux/movieSlice';

const useThrillerMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchThrillerMovies = async () => {
            try {
                const res = await axios.get(Thriller_Movie, options);
                dispatch(getThrillerMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchThrillerMovies();
    }, [dispatch]);
};

export default useThrillerMovies; 