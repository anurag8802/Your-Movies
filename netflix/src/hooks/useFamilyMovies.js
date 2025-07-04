import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Family_Movie } from '../utils/constant';
import { getFamilyMovies } from '../redux/movieSlice';

const useFamilyMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchFamilyMovies = async () => {
            try {
                const res = await axios.get(Family_Movie, options);
                dispatch(getFamilyMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchFamilyMovies();
    }, [dispatch]);
};

export default useFamilyMovies; 