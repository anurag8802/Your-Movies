import axios from "axios";
import { options } from '../utils/constant';
import { useDispatch } from "react-redux";
import { setBackgroundTrailer, setDialogTrailer } from '../redux/movieSlice';
import { useEffect } from "react";

export const useBackgroundTrailerById = (movieId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!movieId) return;
    const getMovieById = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
        const trailer = res?.data?.results?.filter((item) => item.type === "Trailer");
        dispatch(setBackgroundTrailer(trailer.length > 0 ? trailer[0] : res.data.results[0]));
      } catch (error) {
        console.log(error);
      }
    }
    getMovieById();
  }, [movieId, dispatch]);
}

export const useDialogTrailerById = (movieId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!movieId) return;
    const getMovieById = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
        const trailer = res?.data?.results?.filter((item) => item.type === "Trailer");
        dispatch(setDialogTrailer(trailer.length > 0 ? trailer[0] : res.data.results[0]));
      } catch (error) {
        console.log(error);
      }
    }
    getMovieById();
  }, [movieId, dispatch]);
}