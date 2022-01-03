import styles from "./styles.module.css";
import cn from "classnames";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

export function SearchForm() {

  const [booksList, setBooksList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [housesList, setHousesList] = useState([]);
  const [searchClick, setSearchClick] = useState(false);

  const [bookValue, setBookValue] = useState({
    title: '',
    author: '',
    publishHouse: '',
    genre: '',
    publishYear: ''
  });

  const inputOnChange = ({target}: any) => {
    setBookValue({...bookValue, [target.name]:target.value});
  }

  // const [bookTitle, setBookTitle] = useState('');
  // const [bookAuthor, setBookAuthor] = useState('');
  // const [bookPublishHouse, setBookPublishHouse] = useState('');
  // const [bookGenre, setBookGenre] = useState('');
  // const [bookPublishYear, setBookPublishYear] = useState('');
  const [bookIsAvailable, setBookIsAvailable] = useState(false);

  const resetAllInputs = () => {
    setBookValue({...bookValue, title: '', author: ''});
    setBookValue({...bookValue, author: ''});
    setBookValue({...bookValue, publishHouse: ''});
    setBookValue({...bookValue, genre: ''});
    setBookValue({...bookValue, publishYear: ''});
    setBookIsAvailable(false);
  }

  const searchHouses = async () => {
    const response = await axios.get('http://localhost:3001/api/houses');
    setHousesList(response.data);
  }

  const searchGenres = async () => {
    const response = await axios.get('http://localhost:3001/api/genres');
    setGenresList(response.data);
  }

  useEffect(() => {
    searchGenres();
    searchHouses()
  }, []);

  const searchBooks = async () => {
    const response = await axios.post('http://localhost:3001/api/books', {
      bookValue,
      bookIsAvailable
    });

    setBooksList(response.data);
    setSearchClick(true);
  }

  const notAvailableClass = (isAvailable: boolean) => cn(styles.book, {
    [styles.bookNotAvailable]: !isAvailable,
  });

  const takeBook = () => {
    if (confirm('Чтобы взять книгу, надо войти. Войти?')) {
      Router.push(`/login`);
    }
  }

  const unavailableBook = () => {
    alert('Эта книга уже взята');
  }

  return (
    <div>
      <table className={styles.searchForm}>
        <caption className={styles.searchTitle}>
          Каталог книг
        </caption>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookTitle">
              Название книги
            </label>
          </td>

          <td>
            <input
              type="text"
              id="bookTitle"
              name="title"
              value={bookValue.title}
              onChange={inputOnChange}
              className={styles.input}
            />
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookAuthor">
              ФИО автора
            </label>
          </td>

          <td>
            <input
              type="text"
              id="bookAuthor"
              name="author"
              value={bookValue.author}
              onChange={inputOnChange}
              className={styles.input}
            />
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookPublishHouse">
              Издательство
            </label>
          </td>

          <td>
            <select
              id="bookPublishHouse"
              name="publishHouse"
              value={bookValue.publishHouse}
              onChange={inputOnChange}
              className={styles.input}
            >
              <option hidden selected disabled/>
              {genresList &&
              genresList.map(({genre}, index) => {
                return (
                  <option key={index}>
                    {genre}
                  </option>
                );
              })}
            </select>
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookGenre">
              Жанр
            </label>
          </td>

          <td>
            <select
              id="bookGenre"
              name="genre"
              value={bookValue.genre}
              onChange={inputOnChange}
              className={styles.input}
            >
              <option hidden selected disabled/>
              {housesList &&
               housesList.map(({house}, index) => {
                return (
                  <option key={index}>
                    {house}
                  </option>
                );
              })}
            </select>
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookPublishYear">
              Год издания
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
              onChange={inputOnChange}
              className={cn(styles.input, styles.inputYear)}
            />
          </td>
        </tr>

        <tr>
          <td className={styles.inputTitle}>
            <label htmlFor="bookIsAvailable">
              В наличии
            </label>
          </td>

          <td>
            <input
              type="checkbox"
              id="bookIsAvailable"
              name="isAvailable"
              className={styles.checkbox}
              checked={bookIsAvailable}
              onChange={(e) => setBookIsAvailable(e.target.checked)}
              // onChange={inputOnChange}
            />
            <label htmlFor="bookIsAvailable" className={styles.label}/>
          </td>
        </tr>

        <tr>
          <td colSpan={2} className={styles.buttonGroup}>
            <button className={styles.button} onClick={searchBooks}>
              Поиск
            </button>

            <button className={styles.button} onClick={resetAllInputs}>
              Очистить
            </button>
          </td>
        </tr>
      </table>

      <div className={styles.booksContainer}>
        {!(booksList.length === 0 && searchClick) ? (
          booksList &&
          booksList.map(({
                           author,
                           genre,
                           house,
                           isAvailable,
                           title,
                           year
                         }, index) => {
            return (
              <div
                className={notAvailableClass(isAvailable)}
                key={index}
                onClick={isAvailable ? takeBook : unavailableBook}
              >
                <div className={styles.bookTitle}>"{title}"</div>
                <div><b>Автор:</b> {author}</div>
                <div><b>Издательство:</b> {house}</div>
                <div><b>Жанр:</b> {genre}</div>
                <div><b>Год издания:</b> {year}</div>
              </div>
            );
          })
        ) : (
          <div className={styles.nothingSearched}>
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
