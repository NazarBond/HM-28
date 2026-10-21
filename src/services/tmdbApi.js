import axios from "axios";


const API_KEY = "f46c1d0ce2a6997d57e3d839898c078e";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {
  api_key: API_KEY,
};


export async function fetchTrendingMovies() {
  const response = await axios.get("/trending/movie/day");
  return response.data.results;
}


export async function searchMovies(query) {
  const response = await axios.get(`/search/movie`, {
    params: {
      query,
    },
  });
  return response.data.results;
}


export async function fetchMovieDetails(movieId) {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
}


export async function fetchMovieCast(movieId) {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data.cast;
}


export async function fetchMovieReviews(movieId) {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data.results;
}
