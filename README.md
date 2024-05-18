### BASIC REACT SETUP
Video Demo: 


https://github.com/prachikaag/MoviesApp/assets/37405362/a2321fe2-ca65-4ee2-9152-16098db11f34


### 1. Create a react project folder and delecte all source files
     npx create-react-app flimflix
     npm start

### 2. Create index.js and App.js files to set our initial playground
    index.js       
        const rootElement = document.getElementById("root");
        const root = ReactDOM.createRoot(rootElement);
        root.render(<App />);
    App.js
        import React from "react";
        const App = () => {return(<>Hi</>)}
        export default App

### 3. Create your API Key String inside your App.js file like
    a) const API_URL = 'http://www.omdbapi.com?/apikey=[key]&';
    b) now use use the useEffect hook from react to call this function, don't forget to pass an empty array or this will run in an infinite loop
    c) write the API call in your App function
        const searchMoviews = async(title)=>{
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            console.log(data);
        }
        useEffect(()=>{
            searchMoviews('spiderman')
        },[])   


### 4. Now we start building our front end
    a) build basic searchbar
    b) create some static data variable like
        const movie1 = {
            "Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
            "Title": "Italian Spiderman",
            "Type": "movie",
            "Year": "2007",
            "imdbID": "tt2705436"
        }
    c) A couple of calling best practices:
        * for an input parameter if you want a change in state call onChange={()=>{}} within the div
        * for an onclick button add onClick={()=>{}} for change in state
        * fetch values from the api in out code like this -> {movie1.Year}, etc

### 5. Now we learn to update this data dynamically for all movies using a custom component
    a) Take the component you want to repeat and add it in a seperate Movie.jsx file of it's own, pass in props i.e. the value you are destructuring in this code like
        const Movie = ( {movie1} ) => { return (<> {movie1.year} </>)}
        this is now our resuable component 
    b) now in the App.js file import the Movie file you just reacted and call the component like
        < Movie movie1={movie1} />

### 6. Now we learn how to print multiple values from the API
    a) In our App.js create this hook where allMovies is the variable which will store APIData and setAllMovies function is going to be used to update it
        const [allmovies, setAllMovies] = useState([]);
    b) now instead of console log pass the data from useEffect hook into our useState like:
        setAllMovies(data.Search);
    c) Now in return function we can dynamically pass our movie value into the app and delete the constant movie1 variable we created or do
        <Movie movie1={allmovies[1]?allmovies[1]:movie1}/>
    d) Now to update this dynamically for all movies use a map function and replace the above line of code with this:
        {allmovies?.length>0?(
            <div className="container">
                {allmovies.map((movie)=>(
                    <Movie movie={movie}/>
                ))}
            </div>
        ) : (
            <div className="empty"> No movies Found </div>
        )}

### 7. Now let's get the Search functionality working so we use another useEffect for this
    a) Declare the UseState variable and function first 
        const [searchTerm, setSearchTerm] = useState('');
    b) Now in the Input button update the value and onChange to allow the user type like
        <input placeholder="Search for Movies" 
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
        />
    c) Now we update the same for Search image button
        <img src={SearchIcon} alt="search" color="#FFFF" 
            onClick={()=>searchMoviews(searchTerm)} />
    Now everytime the button is clicked the state is dynamically changed
