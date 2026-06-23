import {createContext, useState, useContext, useEffect} from "react"

// This context will manage the state of favorite movies across the app
const MovieContext = createContext()

// Custom hook to easily access the MovieContext
export const useMovieContext = () => useContext(MovieContext)

// Provider component that wraps the app and provides the movie context value
export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]) // State to hold the list of favorite movies

    // Load favorites from localStorage when the component mounts

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    // Save favorites to localStorage whenever the favorites state changes
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    // Function to add a movie to favorites
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }
    // Function to remove a movie from favorites by its ID
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    // Function to check if a movie is already in favorites
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    // The value provided to the context includes the favorites list and the functions to manipulate it
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    // Render the provider with the value and wrap it around the children components
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}