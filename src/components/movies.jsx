import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";

class Movies extends Component {
  state = {
    movies: [],
  };

  render() {
    return (
      <main className="container">
        <h1>Movies</h1>

        {this.renderMovies()}
      </main>
    );
  }

  renderMovies() {
    const isEmpty = this.state.movies.length === 0;
    if (isEmpty) return <p>There are no movies in the database</p>;

    return (
      <React.Fragment>
        <p>Showing {this.state.movies.length} movies from the database</p>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((m) => {
              return (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.dailyRentalRate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
