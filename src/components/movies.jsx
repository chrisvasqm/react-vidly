import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService.js'

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    render() { 
        return (<div>
            <h1>Movies</h1>
        </div>);
    }
}
 
export default Movies;