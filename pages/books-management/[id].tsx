import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { HeadBlock } from '../../components/ui/head-block';
import { MainHeaderWrapper } from '../../components/ui/main-header-wrapper';
import { MainLogo } from '../../components/ui/main-logo';
import { MainMenuUsers } from '../../components/ui/main-menu-users';
import { MainPageWrapper } from '../../components/ui/main-page-wrapper';
import styles from './styles.module.css';
import cn from "classnames";
import SearchIcon from './icon-search.png';
import Image from "next/image";


export default function BooksManagementPage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const [userData, setUserData]: any = useState({});

  const [books, setBooks] = useState([]);
  const [searchingBookTitle, setSearchingBookTitle] = useState('');

  const [addBookClick, setAddBookClick] = useState(true);
  const [editBookClick, setEditBookClick] = useState(false);

  const [bookValue, setBookValue] = useState({
    title: '',
    author: '',
    publishHouse: '',
    otherPublishHouse: '',
    genre: '',
    otherGenre: '',
    publishYear: '',
    numberCopies: ''
  });

  const [lists, setLists] = useState({
    genres: [],
    houses: []
  });

  const inputOnChange = ({target}: any) => {
    setBookValue({ ...bookValue, [target.name]: target.value });
  }

  const getUserData = async () => {
    await axios
      .post('http://localhost:3002/api/user', {
        id
      }).then((response) => {
        setUserData(response.data);
      });
  }

  const searchGenresAndHouses = async () => {
    const responseHouses = await axios.get('http://localhost:3002/api/houses');
    const responseGenres = await axios.get('http://localhost:3002/api/genres');
    setLists({ ...lists, houses: responseHouses.data, genres: responseGenres.data });
  }

  const getBooksByTitle = async () => {
    await axios
      .post('http://localhost:3002/api/booksByTitle', {
        searchingBookTitle
      }).then((response) => {
        setBooks(response.data);
      });
  }

  const addBook = async () => {
    await axios
      .post('http://localhost:3002/api/addBook', {
        ...bookValue,
      }).then((response) => {
        alert(response.data);
        if (response.data === 'Книга добавлена') {
          setBookValue({
            ...bookValue,
            title: '',
            author: '',
            publishHouse: '',
            otherPublishHouse: '',
            genre: '',
            otherGenre: '',
            publishYear: '',
            numberCopies: ''
          });
        }
      });
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserData();
    searchGenresAndHouses()
  }, [id]);

  const handleAddBookSubmit = () => {
    if (confirm(`Вы уверены, что хотите добавить книгу "${bookValue.title}"?`)) {
      addBook();
    }
  };

  const addBookTableClass = () => cn(styles.booksManagementBlock, {
    [styles.noDisplay]: !addBookClick,
  });

  const editBookTableClass = () => cn(styles.booksManagementBlock, {
    [styles.noDisplay]: !editBookClick,
  });

  const activeAddBookClass = () => cn(styles.menuManagementItem, {
    [styles.activeItem]: addBookClick,
  });

  const activeEditBookClass = () => cn(styles.menuManagementItem, {
    [styles.activeItem]: editBookClick,
  });

  return (
    <div>
      <HeadBlock title="Books management" />

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${id}`} />
          <h1 className={styles.headerTitle}>
            Управление книгами
          </h1>
          <MainMenuUsers user={userData} page="booksManagement" />
        </MainHeaderWrapper>

        <div className={styles.flexBox}>
          <table className={addBookTableClass()}>
            <tr className={cn(styles.inputBlock, styles.twoColumns)}>
              <td colSpan={2}>
                Добавление книги
              </td>
            </tr>

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

            <tr className={styles.inputBlock}>
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

            <tr className={styles.inputBlock}>
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
                  <option selected />
                  {lists.houses
                  && lists.houses.map(({ title, id }) => {
                    return (
                      <option key={id + 1}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>

            <tr className={styles.inputBlock}>
              <td className={styles.inputTitle}>
                <label htmlFor="otherBookPublishHouse">
                  Другое издательство
                </label>
              </td>

              <td>
                <input
                  type="text"
                  id="otherBookPublishHouse"
                  name="otherPublishHouse"
                  value={bookValue.otherPublishHouse}
                  onChange={inputOnChange}
                  className={styles.input}
                />
              </td>
            </tr>

            <tr className={styles.inputBlock}>
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
                  <option selected />
                  {lists.genres
                  && lists.genres.map(({ title, id }) => {
                    return (
                      <option key={id + 1}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>

            <tr className={styles.inputBlock}>
              <td className={styles.inputTitle}>
                <label htmlFor="otherBookGenre">
                  Другой жанр
                </label>
              </td>

              <td>
                <input
                  type="text"
                  id="otherBookGenre"
                  name="otherGenre"
                  value={bookValue.otherGenre}
                  onChange={inputOnChange}
                  className={styles.input}
                />
              </td>
            </tr>

            <tr className={styles.inputBlock}>
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
                  className={cn(styles.input, styles.inputNumber)}
                />
              </td>
            </tr>

            <tr className={styles.inputBlock}>
              <td className={styles.inputTitle}>
                <label htmlFor="bookNumberCopies">
                  Количество экземпляров
                </label>
              </td>

              <td>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  id="bookNumberCopies"
                  name="numberCopies"
                  value={bookValue.numberCopies}
                  onChange={inputOnChange}
                  className={cn(styles.input, styles.inputNumber)}
                />
              </td>
            </tr>

            <tr className={cn(styles.inputBlock, styles.twoColumns)}>
              <td colSpan={2}>
                <button
                  type="button"
                  onClick={handleAddBookSubmit}
                  className={styles.button}
                >
                  Добавить книгу
                </button>
              </td>
            </tr>
          </table>

          <table className={editBookTableClass()}>
            <tr className={cn(styles.inputBlock, styles.twoColumns)}>
              <td colSpan={2}>
                Редактирование книги
              </td>
            </tr>

            <tr>
              <td className={styles.inputTitle}>
                <label htmlFor="searchingBookTitle">
                  Поиск по названию книги:
                </label>
              </td>

              <td className={cn(styles.flexBox, styles.flexBoxCenter)}>
                <input
                  type="text"
                  id="searchingBookTitle"
                  name="searchingBookTitle"
                  value={searchingBookTitle}
                  onChange={(e) => setSearchingBookTitle(e.target.value)}
                  className={cn(styles.input, styles.inputSearch)}
                />

                <button
                  type="button"
                  onClick={getBooksByTitle}
                  className={styles.buttonSearch}
                >
                  <Image
                    src={SearchIcon}
                    width={30}
                    height={30}
                    alt="Поиск книги"
                  />
                </button>
              </td>
            </tr>

            <tr>
              <td colSpan={2} className={styles.booksContainer}>
                {!(books.length === 0) ? (
                  books &&
                  books.map(({
                     author,
                     genreTitle,
                     houseTitle,
                     title,
                     year,
                     dateIssueFormat
                   }, index) => {
                    return (
                      <div
                        className={styles.book}
                        key={index}
                      >
                        <div className={styles.bookTitle}>&quot;{title}&quot;</div>
                        <div><b>Автор:</b> {author}</div>
                        <div><b>Издательство:</b> {houseTitle}</div>
                        <div><b>Жанр:</b> {genreTitle}</div>
                        <div><b>Год издания:</b> {year || 'Не указан'}</div>
                        <div><b>Дата выдачи книги:</b> {dateIssueFormat}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className={styles.nothingSearched}>
                    Нет таких книг
                  </div>
                )}
              </td>
            </tr>
          </table>

          <div>
            <div
              className={activeAddBookClass()}
              onClick={() => { setAddBookClick(true); setEditBookClick(false); }}
            >
              Добавление книги
            </div>

            <div
              className={activeEditBookClass()}
              onClick={() => { setAddBookClick(false); setEditBookClick(true); }}
            >
              Редактирование книги
            </div>
          </div>
        </div>
      </MainPageWrapper>
    </div>
  );
}
