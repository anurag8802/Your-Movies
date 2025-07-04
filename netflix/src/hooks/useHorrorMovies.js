import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Horror_Movie } from '../utils/constant';
import { getHorrorMovies } from '../redux/movieSlice';

const useHorrorMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchHorrorMovies = async () => {
            try {
                const res = await axios.get(Horror_Movie, options);
                dispatch(getHorrorMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchHorrorMovies();
    }, [dispatch]);
};

export default useHorrorMovies; 