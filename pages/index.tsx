import React, {useState} from "react";
import styles from '../styles/styles.module.css';
import cn from 'classnames';
import { HeadBlock } from '../components/ui/head-block';
import axios from "axios";
import {MainHeaderWrapper} from "../components/ui/main-header-wrapper";
import {MainLogo} from "../components/ui/main-logo";
import {MainGreeting} from "../components/ui/main-greeting";
// import {LoginToAccountLink} from "../components/ui/login-to-account-link";
import {MainMenuUsers} from "../components/ui/main-menu-users";

export default (): JSX.Element => {
  const [booksList, setBooksList] = useState([]);
  const [searchClick, setSearchClick] = useState(false);

  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookPublishHouse, setBookPublishHouse] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookPublishYear, setBookPublishYear] = useState('');
  const [bookIsAvailable, setBookIsAvailable] = useState(false);

  const publishingHouses = [
    'РОСМЭН',
    'Издательство1',
    'Издательство2',
    'Издательство3',
    'Издательство4',
  ];

  const genres = [
    'Фантастика',
    'Фэнтэзи',
    'Ужасы',
    'Комедия',
    'Сказки',
  ]

  const resetAllInputs = () => {
    setBookTitle('');
    setBookAuthor('');
    setBookPublishHouse('');
    setBookGenre('');
    setBookPublishYear('');
    setBookIsAvailable(false);
  }

  const searchBooks = async () => {
    const responce = await axios.post('http://localhost:3001/api/books', {
      bookTitle,
      bookAuthor,
      bookPublishHouse,
      bookGenre,
      bookPublishYear,
      bookIsAvailable
    });

    setBooksList(responce.data);
    setSearchClick(true);
  }

  const notAvailableClass = (isAvailable: boolean) => cn(styles.book, {
    [styles.bookNotAvailable]: !isAvailable,
  });

  const takeBook = () => {
    alert('Чтобы взять книгу, надо войти');
  }

  return (
    <div className={styles.container}>
      <HeadBlock title="Main Page" />


      <div className={styles.mainWrapper}>
        <MainHeaderWrapper>
          <MainLogo/>
          <MainGreeting name="Гость"/>
          {/*<LoginToAccountLink />*/}
          <MainMenuUsers folder="user page"/>
        </MainHeaderWrapper>

        <table className={styles.searchForm}>
          <caption className={styles.searchTitle}>Каталог книг</caption>

          <tr className={styles.inputBlock}>
            <td className={styles.inputTitle}>
              <label htmlFor="bookTitle">Название книги</label>
            </td>
            <td>
              <input
                type="text"
                id="bookTitle"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className={styles.input}
              />
            </td>
          </tr>

          <tr className={styles.inputBlock}>
            <td className={styles.inputTitle}>
              <label htmlFor="bookAuthor">ФИО автора</label>
            </td>
            <td>
              <input
                type="text"
                id="bookAuthor"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
                className={styles.input}
              />
            </td>
          </tr>

          <tr className={styles.inputBlock}>
            <td className={styles.inputTitle}>
              <label htmlFor="bookPublishHouse">Издательство</label>
            </td>
            <td>
              <select
                id="bookPublishHouse"
                value={bookPublishHouse}
                onChange={(e) => setBookPublishHouse(e.target.value)}
                className={styles.input}
              >
                <option hidden selected disabled />
                {publishingHouses &&
                publishingHouses.map((publishingHouse, index) => {
                  return (
                    <option key={index}>{publishingHouse}</option>
                  );
                })}
              </select>
            </td>
          </tr>

          <tr className={styles.inputBlock}>
            <td className={styles.inputTitle}>
              <label htmlFor="bookGenre">Жанр</label>
            </td>
            <td>
              <select
                id="bookGenre"
                value={bookGenre}
                onChange={(e) => setBookGenre(e.target.value)}
                className={styles.input}
              >
                <option hidden selected disabled />
                {genres &&
                genres.map((genre, index) => {
                  return (
                    <option key={index}>{genre}</option>
                  );
                })}
              </select>
            </td>
          </tr>

          <tr className={styles.inputBlock}>
            <td className={styles.inputTitle}>
              <label htmlFor="bookPublishYear">Год издания</label>
            </td>
            <td>
              <input
                type="number"
                min="1800"
                max="2021"
                id="bookPublishYear"
                value={bookPublishYear}
                onChange={(e) => setBookPublishYear(e.target.value)}
                className={cn(styles.input, styles.inputYear)}
              />
            </td>
          </tr>

          <tr className={styles.inputBlock}>
            <td className={styles.inputTitle}>
              <label htmlFor="bookIsAvailable">В наличии</label>
            </td>
            <td>
              <input
                type="checkbox"
                id="bookIsAvailable"
                className={styles.checkbox}
                checked={bookIsAvailable}
                onChange={(e) => setBookIsAvailable(e.target.checked)}
              />
              <label htmlFor="bookIsAvailable" className={styles.label} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={styles.buttonGroup}>
              <button className={styles.button} onClick={searchBooks}>Поиск</button>
              <button className={styles.button} onClick={resetAllInputs}>Очистить</button>
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
                <div className={notAvailableClass(isAvailable)} key={index} onClick={isAvailable ? takeBook : undefined}>
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
          )
          }
        </div>
      </div>

    </div>
  );
}
