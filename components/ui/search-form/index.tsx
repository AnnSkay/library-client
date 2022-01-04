import cn from 'classnames';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import styles from './styles.module.css';

export function SearchForm({ id }: { id: string }) {
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

  const inputOnChange = (name: string, value: any) => {
    setBookValue({ ...bookValue, [name]: value });
  }

  const searchGenresAndHouses = async () => {
    const responseHouses = await axios.get('http://localhost:3001/api/houses');
    const responseGenres = await axios.get('http://localhost:3001/api/genres');
    setLists({ ...lists, houses: responseHouses.data, genres: responseGenres.data });
  }

  useEffect(() => {
    searchGenresAndHouses();
  }, []);

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
  }

  const searchBooks = async () => {
    const response = await axios.post('http://localhost:3001/api/books', {
      ...bookValue
    });

    setLists({ ...lists, books: response.data });
    setSearchClick(true);
  }

  const notAvailableClass = (isAvailable: boolean) => cn(styles.book, {
    [styles.bookNotAvailable]: !isAvailable,
  });

  const takeBook = (title: string, bookId: number) => {
    if (id === 'гость') {
      if (confirm('Чтобы взять книгу, надо войти. Войти?')) {
        Router.push('/login');
      }
    } else {
      if (confirm(`Вы уверены, что хотите взять книгу "${title}"?`)) {
        alert(`Книга c ID: ${bookId} взята`);
      }
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
              onChange={(e) => inputOnChange(e.target.name, e.target.value)}
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
              onChange={(e) => inputOnChange(e.target.name, e.target.value)}
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
              onChange={(e) => inputOnChange(e.target.name, e.target.value)}
              className={styles.input}
            >
              <option hidden selected disabled />
              {lists.houses
               && lists.houses.map(({ house }, index) => {
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
            <label htmlFor="bookGenre">
              Жанр
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
               && lists.genres.map(({ genre }, index) => {
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
              onChange={(e) => inputOnChange(e.target.name, e.target.value)}
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
              checked={bookValue.isAvailable}
              // onChange={(e) => setBookIsAvailable(e.target.checked)}
              onChange={(e) => inputOnChange(e.target.name, e.target.checked)}
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
        {!(lists.books.length === 0 && searchClick) ? (
          lists.books &&
          lists.books.map(({
            id,
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
                onClick={isAvailable ? () => takeBook(title, id) : unavailableBook}
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
