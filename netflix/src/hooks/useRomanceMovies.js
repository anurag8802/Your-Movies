import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Romance_Movie } from '../utils/constant';
import { getRomanceMovies } from '../redux/movieSlice';

const useRomanceMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchRomanceMovies = async () => {
            try {
                const res = await axios.get(Romance_Movie, options);
                dispatch(getRomanceMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchRomanceMovies();
    }, [dispatch]);
};

export default useRomanceMovies; 