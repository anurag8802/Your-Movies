import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Inspirational_Movie } from '../utils/constant';
import { getInspirationalMovies } from '../redux/movieSlice';

const useInspirationalMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchInspirationalMovies = async () => {
            try {
                const res = await axios.get(Inspirational_Movie, options);
                dispatch(getInspirationalMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchInspirationalMovies();
    }, [dispatch]);
};

export default useInspirationalMovies; 