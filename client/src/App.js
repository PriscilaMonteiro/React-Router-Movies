import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          setMovieList(response.data)
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movieId => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    const  movie  = movieList.find(movie => movie.movieId === +movieId)
    const savedMovie = saved.find(movie => movie.movieId === +movieId)
    return !savedMovie ? setSaved([...saved, movie]) : null
  };

  return (
    <div>
      <SavedList list={saved} />
      
        {/* <div>
          <Link to='/'>Home</Link>
          <Link to='/movies'>Movie List</Link>
        </div> */}

        <Switch>
            <Route path={"/movies/:movieId"}>
              <Movie movies={movieList} />
            </Route>
            <Route exact path="/">
              <MovieList movies={movieList}/>
            </Route>

            <Redirect to='/movies'/>
          </Switch>
     

      
    </div>
  );
}
