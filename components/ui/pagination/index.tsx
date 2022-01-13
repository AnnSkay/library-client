import styles from './styles.module.css';
import cn from "classnames";

export function Pagination({ books, pagination }: { pagination: any, books: any }): JSX.Element {
  // { page, totalPages, setPage, prevPage, nextPage }:
  // { page: number, totalPages: number, setPage: any, prevPage: any, nextPage: any}

  const paginationBlockClass = () => cn(styles.paginationBlock, {
    [styles.noDisplay]: books.length === 0,
  });

  const numberPageClass = (el: number) => cn(styles.page, {
    [styles.active]: pagination.page === el + 1,
  });

  const prevPageButtonClass = () => cn(styles.page, {
    [styles.disabled]: pagination.page === 1,
  });

  const nextPageButtonClass = () => cn(styles.page, {
    [styles.disabled]: pagination.page === pagination.totalPages,
  });

  return (
    <div className={paginationBlockClass()}>
      <p className={styles.numberOfPages}>
        {pagination.page}/{pagination.totalPages}
      </p>
      <button onClick={pagination.prevPage} className={prevPageButtonClass()}>
        &larr;
      </button>
      {/* @ts-ignore */}
      {[...Array(pagination.totalPages).keys()].map((el) => (
        <button
          onClick={() => pagination.setPage(el + 1)}
          key={el}
          className={numberPageClass(el)}
        >
          {el + 1}
        </button>
      ))}
      <button onClick={pagination.nextPage} className={nextPageButtonClass()}>
        &rarr;
      </button>
    </div>
  );
}
