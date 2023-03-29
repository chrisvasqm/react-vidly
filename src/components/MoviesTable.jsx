import Like from './common/Like';
import React from 'react';

const MoviesTable = ({ movies, onDelete, onLike }) => {
  return (
    <>
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
                      onLike(movie);
                    }}
                  />
                </td>
                <td>
                  <button
                    className='btn btn-danger btn-sm m-2'
                    onClick={() => {
                      onDelete(movie._id);
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
    </>
  );
};

export default MoviesTable;
