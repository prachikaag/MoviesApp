import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import Movie from "./Movie";
// ff5d5fa8
const API_URL = 'http://www.omdbapi.com/?apikey=ff5d5fa8&';

const movie1 = {
    "Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
    "Title": "Italian Spiderman",
    "Type": "movie",
    "Year": "2007",
    "imdbID": "tt2705436"
}
const App = () => {

    const [allmovies, setAllMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMoviews = async(title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setAllMovies(data.Search)
    }
    useEffect(()=>{
        searchMoviews('spiderman')
    },[])

    return(
        <div className="app">
            <h1> Movie Land </h1>
            <div className="search">
                <input placeholder="Search for Movies" 
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon} alt="search" color="#FFFF" 
                    onClick={()=>searchMoviews(searchTerm)} />
            </div>
            {
                allmovies?.length>0?(
                    <div className="container">
                        {allmovies.map((movie)=>(
                            <Movie movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty"> No movies Found </div>
                )
            }
            
        </div>
    )
}

export default App