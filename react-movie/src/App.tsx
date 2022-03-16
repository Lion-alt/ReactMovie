import { useEffect, useState } from 'react';
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
const API_URL = 'http://www.omdbapi.com?apikey=93c1f1fa'

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const searchMovies = async (title: string) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search)
        console.log(movies)
    }

    useEffect(() => {
        searchMovies('Spiderman')
    }, [])
    return (
        <div className="App">
            <h1>MovieLand</h1>
            <div className="search">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for movies" />
                <img src={SearchIcon} alt="search" onClick={() => { searchMovies(searchTerm) }} />
            </div>

            {
                movies?.length > 0 ?
                    (<div className="container">
                        {movies.map((movie: { Year: number, Title: string, Poster: string, Type: string }) => {
                            <div className="movie">
                                <div>
                                    <p>
                                        {movie.Year}
                                    </p>

                                </div>
                                <div>
                                    <img src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title} />
                                </div>
                                <div><span>
                                    {movie.Type}
                                </span>
                                    <h3>{movie.Title}</h3></div>

                            </div>
                        })
                        }{console.log(movies)}</div>)
                    : (<div className="empty"><h2>No movies found</h2></div>)
            }


        </div>
    )
}

export default App