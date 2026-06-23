import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

// Home page component
function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [movies, setMovies] = useState([]); // State for movies to display
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch popular movies on component mount
  useEffect(() => {
    const loadPopularMovies = async () => {// async function to load popular movies - async allows us to use await inside it
      try {
        // Fetch popular movies from the API
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        // Log the error and set an error message if fetching fails
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        // Set loading to false after the fetch attempt is complete, regardless of success or failure
        setLoading(false);
      }
    };
    // Call the function to load popular movies when the component mounts
    loadPopularMovies();
  }, []);

  // this function is called when the search form is submitted. It prevents the default form submission behavior, checks if the search query is not empty and if it's not already loading. If both conditions are met, it sets loading to true and tries to fetch movies based on the search query. If the fetch is successful, it updates the movies state with the search results and clears any previous error messages. If there's an error during the fetch, it logs the error and sets an error message. Finally, it sets loading to false after the fetch attempt is complete.
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        // Fetch movies based on the search query from the API
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        // Log the error and set an error message if the search fails
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="home">
        {/* Search form for movies */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          // Bind the input value to the searchQuery state and update it on change
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
        {/* Display error message if there is an error */}
        {error && <div className="error-message">{error}</div>}
    {/* Display loading message while fetching data, otherwise display the movies grid */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;