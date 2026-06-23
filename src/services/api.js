const API_KEY = "$######"; //REPLACE WITH YOUR API KEY FROM THE SITE
const BASE_URL = "https://api.themoviedb.org/3";

// Function to fetch popular movies from TMDb API
export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}
// Function to search movies based on a query
export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);//encodeURIComponent is used to safely encode the search query for use in a URL
    const data = await response.json();
    return data.results;
}
