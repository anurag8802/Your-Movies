export const API_END_POINT = "https://moviefy-backend-oex8.onrender.com/api/v1/user";
export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTczOTRlMWJlYmI5MjZhNGY5YjgzNTU3ZmQxYTE4YiIsInN1YiI6IjY2MDkxMTQyMmZhZjRkMDE0YWM3MWQ4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y3Z8N1gt2AUnrQ4Njemy16PlFWn1UdKpTd1bioMs9yU'
  }
};
export const Now_Playing_Movie = "https://api.themoviedb.org/3/movie/now_playing";
export const Popular_Movie = "https://api.themoviedb.org/3/movie/popular";
export const Top_Rated_Movie = "https://api.themoviedb.org/3/movie/top_rated";
export const Upcoming_Movie = "https://api.themoviedb.org/3/movie/upcoming";

export const  SEARCH_MOVIE_URL="https://api.themoviedb.org/3/search/movie?query=";

export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";

export const Action_Movie = "https://api.themoviedb.org/3/discover/movie?with_genres=28";
export const Horror_Movie = "https://api.themoviedb.org/3/discover/movie?with_genres=27";
export const Top10_Hindi_Movie = "https://api.themoviedb.org/3/discover/movie?with_original_language=hi&sort_by=popularity.desc";
export const Thriller_Movie = "https://api.themoviedb.org/3/discover/movie?with_genres=53";
export const Crime_Movie = "https://api.themoviedb.org/3/discover/movie?with_genres=80";
export const Romance_Movie = "https://api.themoviedb.org/3/discover/movie?with_genres=10749";
export const Inspirational_Movie = "https://api.themoviedb.org/3/discover/movie?with_keywords=180547";
export const Marvel_Movie = "https://api.themoviedb.org/3/discover/movie?with_companies=420";
export const Family_Movie = "https://api.themoviedb.org/3/discover/movie?with_genres=10751";
export const Popular_Kid_Movie = "https://api.themoviedb.org/3/discover/movie?with_genres=16,10751&sort_by=popularity.desc";