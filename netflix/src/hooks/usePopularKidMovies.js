import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Popular_Kid_Movie } from '../utils/constant';
import { getPopularKidMovies } from '../redux/movieSlice';

const usePopularKidMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchPopularKidMovies = async () => {
            try {
                const res = await axios.get(Popular_Kid_Movie, options);
                dispatch(getPopularKidMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchPopularKidMovies();
    }, [dispatch]);
};

export default usePopularKidMovies; 