import "../css/MovieCard.css"
import { useMovieContext } from "../context/MovieContext"

{/* MovieCard component to display individual movie details and handle favorite functionality */}
function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();{/* Accessing context to manage favorites */}
    const favorite = isFavorite(movie.id);{/* Check if the current movie is in favorites */}

   {/* Function to handle favorite button click */}
    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>{/* Display movie poster using the provided URL and movie title as alt text */}
            <div className="movie-overlay">
                {/* Favorite button with conditional styling based on whether the movie is a favorite or not */}
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>{/* Display movie title */}
            <p>{movie.release_date}</p>{/* Display release date */}
        </div>
    </div>
}

{/*Exporting MovieCard component for use in other parts of the application*/}
export default MovieCard