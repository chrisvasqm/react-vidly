import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, onPageChanged }) => {
  const pages = getPages(itemsCount, pageSize);

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pages.map(page => {
          return (
            <li key={page} className='page-item'>
              <a className='page-link' href='#' onClick={() => onPageChanged(page)}>
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  function getPages(itemsCount, pageSize) {
    const count = Math.ceil(itemsCount / pageSize);
    if (count === 1) return [];

    return _.range(1, count + 1);
  }
};

export default Pagination;
