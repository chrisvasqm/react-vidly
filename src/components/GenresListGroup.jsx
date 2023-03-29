const GenresListGroup = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <ul className='list-group'>
      {genres.map(genre => (
        <li
          key={genre._id}
          className={genre._id === selectedGenre._id ? 'list-group-item active' : 'list-group-item'}
          onClick={() => onSelectGenre(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default GenresListGroup;
