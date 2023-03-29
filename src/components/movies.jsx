import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService.js';
import Like from './common/like.jsx';
import Pagination from './common/pagination.jsx';
import paginate from '../utils/paginate.js';

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4
  };

  render() {
    return (
      <main className='container'>
        <h1>Movies</h1>

        {this.renderMovies()}
      </main>
    );
  }

  renderMovies() {
    const { movies: allMovies, pageSize, currentPage } = this.state;
    const count = this.state.movies.length;
    const hasNoMovies = count === 0;
    if (hasNoMovies) return <p>There are no movies in the database</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <p>Showing {count} movies from the database</p>

        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Title</th>
              <th scope='col'>Genre</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Rate</th>
              <th scope='col'>Liked</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      isLiked={movie.isLiked}
                      onClick={() => {
                        this.handleLike(movie);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className='btn btn-danger btn-sm m-2'
                      onClick={() => {
                        this.handleDelete(movie._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChanged={this.handlePageChage}
        />
      </React.Fragment>
    );
  }

  handleDelete(id) {
    const movies = this.state.movies.filter(m => m._id !== id);
    this.setState({ movies });
  }

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].isLiked = !movie.isLiked;

    this.setState({ movies });
  }

  handlePageChage = page => {
    this.setState({ currentPage: page });
  };
}

export default Movies;
