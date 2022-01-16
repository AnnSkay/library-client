import React from 'react';
import styles from './styles.module.css';
import cn from 'classnames';

interface BookType {
  id: number;
  title: string;
  author: string;
  houseId: number;
  houseTitle: string;
  genreId: number;
  genreTitle: string;
  year: number;
  numberCopies: number;
}

interface PaginationType {
  firstContentIndex: number;
  lastContentIndex: number;
  nextPage: () => void;
  prevPage: () => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export function Pagination({
                             books,
                             pagination
                           }: { pagination: PaginationType, books: BookType[] }): JSX.Element {
  const paginationBlockClass = () => cn(styles.paginationBlock, {
    [styles.noDisplay]: books.length === 0
  });

  const numberPageClass = (el: number) => cn(styles.page, {
    [styles.active]: pagination.page === el
  });

  const prevPageButtonClass = () => cn(styles.page, {
    [styles.disabled]: pagination.page === 1
  });

  const nextPageButtonClass = () => cn(styles.page, {
    [styles.disabled]: pagination.page === pagination.totalPages
  });

  const arrayOfPages = Array.from(
    {length: pagination.totalPages},
    (v, i) => i + 1
  );

  return (
    <div className={paginationBlockClass()}>
      <p className={styles.numberOfPages}>
        {pagination.page}/{pagination.totalPages}
      </p>
      <button onClick={pagination.prevPage} className={prevPageButtonClass()}>
        &larr;
      </button>
      {
        arrayOfPages.map((el) => (
          <button
            onClick={() => pagination.setPage(el)}
            key={el}
            className={numberPageClass(el)}
          >
            {el}
          </button>
        ))
      }
      <button onClick={pagination.nextPage} className={nextPageButtonClass()}>
        &rarr;
      </button>
    </div>
  );
}
