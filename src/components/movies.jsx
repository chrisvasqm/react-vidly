import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService.js';
import Pagination from './common/Pagination';
import paginate from '../utils/paginate.js';
import GenresListGroup from './GenresListGroup.jsx';
import { getGenres } from '../services/fakeGenreService.js';
import MoviesTable from './MoviesTable.jsx';

class Movies extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
    genres: [],
    movies: []
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genres });
  }

  render() {
    return (
      <main className='container'>
        <h1>Movies</h1>

        {this.renderMovies()}
      </main>
    );
  }

  renderMovies() {
    const { movies: allMovies, pageSize, currentPage, genres, selectedGenre } = this.state;
    const count = allMovies.length;
    const hasNoMovies = count === 0;
    if (hasNoMovies) return <p>There are no movies in the database</p>;

    const filteredMovies =
      selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-2'>
            <GenresListGroup
              genres={genres}
              selectedGenre={selectedGenre}
              onSelectGenre={genre => this.setState({ selectedGenre: genre, currentPage: 1 })}
            />
          </div>
          <div className='col'>
            <p>Showing {movies.length} movies from the database</p>
            <MoviesTable movies={movies} onDelete={this.handleDelete} onLike={this.handleLike} />
            <Pagination
              itemsCount={filteredMovies.length}
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
