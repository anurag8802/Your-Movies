import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Crime_Movie } from '../utils/constant';
import { getCrimeMovies } from '../redux/movieSlice';

const useCrimeMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCrimeMovies = async () => {
            try {
                const res = await axios.get(Crime_Movie, options);
                dispatch(getCrimeMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchCrimeMovies();
    }, [dispatch]);
};

export default useCrimeMovies; 