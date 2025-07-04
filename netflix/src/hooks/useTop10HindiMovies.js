import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Top10_Hindi_Movie } from '../utils/constant';
import { getTop10HindiMovies } from '../redux/movieSlice';

const useTop10HindiMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchTop10HindiMovies = async () => {
            try {
                const res = await axios.get(Top10_Hindi_Movie, options);
                dispatch(getTop10HindiMovies(res.data.results.slice(0, 10)));
            } catch (error) {
                console.log(error);
            }
        };
        fetchTop10HindiMovies();
    }, [dispatch]);
};

export default useTop10HindiMovies; 