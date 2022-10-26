import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
    return (
      <div>
        <main className="container">
          <h1>Movies</h1>

          <p>Showing {this.state.movies.length} movies from the database</p>
        </main>
      </div>
    );
  }
}

export default Movies;
