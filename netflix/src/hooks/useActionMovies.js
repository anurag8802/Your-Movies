import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { options, Action_Movie } from '../utils/constant';
import { getActionMovies } from '../redux/movieSlice';

const useActionMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchActionMovies = async () => {
            try {
                const res = await axios.get(Action_Movie, options);
                dispatch(getActionMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchActionMovies();
    }, [dispatch]);
};

export default useActionMovies; 