import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService.js';
import Like from './common/Like';
import Pagination from './common/Pagination';
import paginate from '../utils/paginate.js';
import GenresListGroup from './GenresListGroup.jsx';
import { getGenres } from '../services/fakeGenreService.js';

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
    selectedGenre: 'All Genres'
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
    const { movies: allMovies, pageSize, currentPage, selectedGenre } = this.state;
    const count = allMovies.length;
    const hasNoMovies = count === 0;
    if (hasNoMovies) return <p>There are no movies in the database</p>;

    let movies = paginate(allMovies, currentPage, pageSize);

    if (selectedGenre !== 'All Genres') movies = movies.filter(m => m.genre.name === selectedGenre);

    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-2'>
            <GenresListGroup
              genres={[{ _id: '', name: 'All Genres' }, ...getGenres()]}
              selectedGenre={selectedGenre}
              onSelectGenre={genre => this.setState({ selectedGenre: genre.name })}
            />
          </div>
          <div className='col'>
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
          </div>
        </div>
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
