import cn from 'classnames';
import React, { useState, useEffect } from 'react';
import usePagination from '../../../hooks/usePagination';
import api from '../../../services/api';
import Router from 'next/router';
import styles from './styles.module.css';
import { Pagination } from '../pagination';

export function SearchForm({id}: { id: number | string | string[] | undefined; }) {
  const [searchClick, setSearchClick] = useState(false);

  const [lists, setLists] = useState({
    books: [],
    genres: [],
    houses: []
  });

  const [bookValue, setBookValue] = useState({
    title: '',
    author: '',
    publishHouse: '',
    genre: '',
    publishYear: '',
    isAvailable: false
  });

  const inputOnChange = (name: string, value: unknown) => {
    setBookValue({
      ...bookValue,
      [name]: value
    });
  };

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages
  } = usePagination({
    contentPerPage: 6,
    count: lists.books.length
  });

  const searchGenresAndHouses = async () => {
    const responseHouses = await api.get('/books/houses');
    const responseGenres = await api.get('/books/genres');
    setLists({...lists, houses: responseHouses.data, genres: responseGenres.data});
  };

  useEffect(() => {
    searchGenresAndHouses();
  }, []);

  const searchBooks = async () => {
    await api
      .get('/books/found-by-filter', {
        params: {
          bookTitle: bookValue.title,
          bookAuthor: bookValue.author,
          bookPublishHouse: bookValue.publishHouse,
          bookGenre: bookValue.genre,
          bookPublishYear: bookValue.publishYear,
          bookIsAvailable: bookValue.isAvailable
        }
      })
      .then((response) => {
        setLists({...lists, books: response.data});
        setSearchClick(true);
      });
  };

  const addTakenBook = async (bookId: string) => {
    await api
      .post('/books/take-book', {
        bookId,
        id
      })
      .then((response) => {
        alert(response.data);
        searchBooks();
      });
  };

  const resetAllInputs = () => {
    setBookValue({
      ...bookValue,
      title: '',
      author: '',
      publishHouse: '',
      genre: '',
      publishYear: '',
      isAvailable: false
    });
  };

  const takeBook = (title: string, bookId: number) => {
    if (id === '??????????') {
      if (confirm('?????????? ?????????? ??????????, ???????? ??????????. ???????????')) {
        Router.push('/login');
      }
    } else {
      if (confirm(`???? ??????????????, ?????? ???????????? ?????????? ?????????? "${title}"?`)) {
        addTakenBook(String(bookId));
      }
    }
  };

  const unavailableBook = () => {
    alert('?????? ?????????? ????????????????????');
  };

  const notAvailableClass = (numberCopies: number) => cn(styles.book, {
    [styles.bookNotAvailable]: numberCopies === 0
  });

  return (
    <div>
      <table className={styles.searchForm}>
        <caption className={styles.searchTitle}>
          ?????????????? ????????
        </caption>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookTitle">
              ???????????????? ??????????
            </label>
          </td>

          <td>
            <input
              type="text"
              id="bookTitle"
              name="title"
              value={bookValue.title}
              onChange={(e) => inputOnChange(e.target.name, e.target.value)}
              className={styles.input}
            />
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookAuthor">
              ?????? ????????????
            </label>
          </td>

          <td>
            <input
              type="text"
              id="bookAuthor"
              name="author"
              value={bookValue.author}
              onChange={(e) => inputOnChange(e.target.name, e.target.value)}
              className={styles.input}
            />
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookPublishHouse">
              ????????????????????????
            </label>
          </td>

          <td>
            <select
              id="bookPublishHouse"
              name="publishHouse"
              value={bookValue.publishHouse}
              onChange={(e) => inputOnChange(e.target.name, e.target.value)}
              className={styles.input}
            >
              <option hidden selected disabled/>
              {lists.houses
               && lists.houses.map(({title, id}) => {
                return (
                  <option key={id}>
                    {title}
                  </option>
                );
              })}
            </select>
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookGenre">
              ????????
            </label>
          </td>

          <td>
            <select
              id="bookGenre"
              name="genre"
              value={bookValue.genre}
              onChange={(e) => inputOnChange(e.target.name, e.target.value)}
              className={styles.input}
            >
              <option hidden selected disabled/>
              {lists.genres
               && lists.genres.map(({title, id}) => {
                return (
                  <option key={id}>
                    {title}
                  </option>
                );
              })}
            </select>
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookPublishYear">
              ?????? ??????????????
            </label>
          </td>

          <td>
            <input
              type="number"
              min="1800"
              max="2021"
              id="bookPublishYear"
              name="publishYear"
              value={bookValue.publishYear}
              onChange={(e) => inputOnChange(e.target.name, e.target.value)}
              className={cn(styles.input, styles.inputYear)}
            />
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookIsAvailable">
              ?? ??????????????
            </label>
          </td>

          <td>
            <input
              type="checkbox"
              id="bookIsAvailable"
              name="isAvailable"
              className={styles.checkbox}
              checked={bookValue.isAvailable}
              onChange={(e) => inputOnChange(e.target.name, e.target.checked)}
            />
            <label htmlFor="bookIsAvailable" className={styles.label}/>
          </td>
        </tr>

        <tr>
          <td colSpan={2} className={styles.buttonGroup}>
            <button className={styles.button} onClick={searchBooks}>
              ??????????
            </button>

            <button className={styles.button} onClick={resetAllInputs}>
              ????????????????
            </button>
          </td>
        </tr>
      </table>

      <Pagination
        books={lists.books}
        pagination={{
          firstContentIndex,
          lastContentIndex,
          nextPage,
          prevPage,
          page,
          setPage,
          totalPages
        }}
      />

      <div className={styles.booksContainer}>
        {!(lists.books.length === 0 && searchClick) ? (
          lists.books &&
          lists.books.slice(firstContentIndex, lastContentIndex)
            .map(({
                    id,
                    author,
                    genreTitle,
                    houseTitle,
                    numberCopies,
                    title,
                    year
                  }, index) => {
              return (
                <div
                  className={notAvailableClass(numberCopies)}
                  key={index}
                  onClick={numberCopies > 0 ? () => takeBook(title, id) : unavailableBook}
                >
                  <div className={styles.bookTitle}>&quot;{title}&quot;</div>
                  <div><b>??????????:</b> {author || '???? ????????????'}</div>
                  <div><b>????????????????????????:</b> {houseTitle}</div>
                  <div><b>????????:</b> {genreTitle}</div>
                  <div><b>?????? ??????????????:</b> {year || '???? ????????????'}</div>
                </div>
              );
            })
        ) : (
           <div className={styles.nothingSearched}>
             ???????????? ???? ??????????????
           </div>
         )}
      </div>
    </div>
  );
}
