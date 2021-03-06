import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import api from '../../services/api';
import { HeadBlock } from '../../components/ui/head-block';
import { MainHeaderWrapper } from '../../components/ui/main-header-wrapper';
import { MainLogo } from '../../components/ui/main-logo';
import { MainMenuUsers } from '../../components/ui/main-menu-users';
import { MainPageWrapper } from '../../components/ui/main-page-wrapper';
import styles from './styles.module.css';
import cn from 'classnames';
import SearchBookIcon from './icon-search-book.png';
import EditBookIcon from './icon-edit-book.png';
import DeleteBookIcon from './icon-delete-book.png';
import GoBackIcon from './icon-go-back.png';
import Image from 'next/image';

export default function BooksManagementPage(): JSX.Element {
  interface UserDataType {
    id: number;
    name: string;
    lastname: string;
    login: string;
    password: string;
    role: string;
    phone: string;
  }

  const router = useRouter();
  const {id} = router.query;

  const [userData, setUserData] = useState<UserDataType>({
    id: 0,
    name: '',
    lastname: '',
    login: '',
    password: '',
    role: '',
    phone: ''
  });

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

  const [books, setBooks] = useState([]);
  const [searchingBookTitle, setSearchingBookTitle] = useState('');

  const [addBookLinkClick, setAddBookLinkClick] = useState(true);
  const [editBookLinkClick, setEditBookLinkClick] = useState(false);

  const [searchBookClick, setSearchBookClick] = useState(false);
  const [editBookClick, setEditBookClick] = useState(false);

  const [bookId, setBookId] = useState('');

  const inputOnChange = (event: { target: HTMLInputElement | HTMLSelectElement; }) => {
    setBookValue({
      ...bookValue,
      [event.target.name]: event.target.value
    });
  };

  const getUserData = async () => {
    await api
      .post('/users/user-data', {
        id
      })
      .then((response) => {
        if (response.data === 'no user') {
          Router.push(`/404.tsx`);
        }
        setUserData(response.data);
      });
  };

  const searchGenresAndHouses = async () => {
    const responseHouses = await api.get('/books/houses');
    const responseGenres = await api.get('/books/genres');
    setLists({...lists, houses: responseHouses.data, genres: responseGenres.data});
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserData();
    searchGenresAndHouses();
  }, [id]);

  const getBooksByTitle = async () => {
    await api
      .get('/books/found-by-title', {
        params: {
          bookTitle: searchingBookTitle
        }
      })
      .then((response) => {
        setBooks(response.data);
        setSearchBookClick(true);
      });
  };

  const addBook = async () => {
    await api
      .post('books/add-book', {
        ...bookValue
      })
      .then((response) => {
        alert(response.data);
        if (response.data === '?????????? ??????????????????') {
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
  };

  const editBook = async () => {
    await api
      .post('books/edit-book', {
        bookId,
        ...bookValue
      })
      .then((response) => {
        alert(response.data);
        setEditBookClick(false);
        setAddBookLinkClick(false);
        setEditBookLinkClick(true);
        getBooksByTitle();
      });
  };

  const deleteSelectedBook = async (bookId: number) => {
    await api
      .post('/books/delete-book', {
        bookId
      })
      .then((response) => {
        alert(response.data);
        getBooksByTitle();
      });
  };

  const goToEditBook = (id: number,
                        title: string,
                        author: string,
                        genreTitle: string,
                        houseTitle: string,
                        year: string,
                        numberCopies: number) => {
    setBookId(String(id));
    setEditBookClick(true);
    setAddBookLinkClick(false);
    setEditBookLinkClick(false);
    setBookValue({
      ...bookValue,
      title: title,
      author: author,
      publishHouse: houseTitle,
      otherPublishHouse: '',
      genre: genreTitle,
      otherGenre: '',
      publishYear: year,
      numberCopies: String(numberCopies)
    });
  };

  const deleteBook = (title: string, bookId: number) => {
    if (confirm(`???? ??????????????, ?????? ???????????? ?????????????? ?????????? "${title}"?`)) {
      deleteSelectedBook(bookId);
    }
  };

  const handleAddBookSubmit = () => {
    if (confirm(`???? ??????????????, ?????? ???????????? ???????????????? ?????????? "${bookValue.title}"?`)) {
      addBook();
    }
  };

  const handleEditBookSubmit = () => {
    editBook();
  };

  const goBack = () => {
    setAddBookLinkClick(false);
    setEditBookLinkClick(true);
    setEditBookClick(false);

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
  };

  const addBookBlockTableClass = () => cn(styles.booksManagementBlock, {
    [styles.noDisplay]: !addBookLinkClick
  });

  const editBookBlockTableClass = () => cn(styles.booksManagementBlock, {
    [styles.noDisplay]: !editBookLinkClick
  });

  const editBookTableClass = () => cn(styles.booksManagementBlock, {
    [styles.noDisplay]: !editBookClick
  });

  const hideManagementBookMenuClass = () => cn({
    [styles.noDisplay]: editBookClick
  });

  const activeAddBookClass = () => cn(styles.menuManagementItem, {
    [styles.activeItem]: addBookLinkClick
  });

  const activeEditBookClass = () => cn(styles.menuManagementItem, {
    [styles.activeItem]: editBookLinkClick
  });

  const inputFieldsForAddAndEdit = () => {
    return (
      <>
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
              onChange={inputOnChange}
              className={styles.input}
            />
          </td>
        </tr>

        <tr className={styles.inputBlock}>
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
              onChange={inputOnChange}
              className={styles.input}
            />
          </td>
        </tr>

        <tr className={styles.inputBlock}>
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
              onChange={inputOnChange}
              className={styles.input}
            >
              <option selected/>
              {lists.houses
               && lists.houses.map(({title, id}) => {
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
              ???????????? ????????????????????????
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
              disabled={bookValue.publishHouse !== ''}
            />
          </td>
        </tr>

        <tr className={styles.inputBlock}>
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
              onChange={inputOnChange}
              className={styles.input}
            >
              <option selected/>
              {lists.genres
               && lists.genres.map(({title, id}) => {
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
              ???????????? ????????
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
              disabled={bookValue.genre !== ''}
            />
          </td>
        </tr>

        <tr className={styles.inputBlock}>
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
              onChange={inputOnChange}
              className={cn(styles.input, styles.inputNumber)}
            />
          </td>
        </tr>

        <tr className={styles.inputBlock}>
          <td className={styles.inputTitle}>
            <label htmlFor="bookNumberCopies">
              ???????????????????? ??????????????????????
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
      </>
    );
  };

  return (
    <div>
      <HeadBlock title="Books management"/>

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${id}`}/>
          <h1 className={styles.headerTitle}>
            ???????????????????? ??????????????
          </h1>
          <MainMenuUsers user={userData} page="booksManagement"/>
        </MainHeaderWrapper>

        <div className={styles.flexBox}>
          <table className={addBookBlockTableClass()}>
            <tr className={cn(styles.inputBlock, styles.twoColumns)}>
              <td colSpan={2}>
                ???????????????????? ??????????
              </td>
            </tr>

            {inputFieldsForAddAndEdit()}

            <tr className={cn(styles.inputBlock, styles.twoColumns)}>
              <td colSpan={2}>
                <button
                  type="button"
                  onClick={handleAddBookSubmit}
                  className={styles.button}
                >
                  ???????????????? ??????????
                </button>
              </td>
            </tr>
          </table>

          <table className={editBookTableClass()}>
            <tr>
              <td colSpan={2}>
                <button
                  type="button"
                  onClick={goBack}
                  className={styles.buttonImage}
                >
                  <Image
                    src={GoBackIcon}
                    width={30}
                    height={30}
                    alt="?????????????????? ??????????"
                  />
                </button>
              </td>
            </tr>
            <tr className={cn(styles.inputBlock, styles.twoColumns)}>
              <td colSpan={2}>
                ???????????????????????????? ??????????
              </td>
            </tr>

            {inputFieldsForAddAndEdit()}

            <tr className={cn(styles.inputBlock, styles.twoColumns)}>
              <td colSpan={2}>
                <button
                  type="button"
                  onClick={handleEditBookSubmit}
                  className={styles.button}
                >
                  ??????????????????????????
                </button>
              </td>
            </tr>
          </table>

          <table className={editBookBlockTableClass()}>
            <tr className={cn(styles.inputBlock, styles.twoColumns)}>
              <td colSpan={2}>
                ???????????????????????????? / ???????????????? ??????????
              </td>
            </tr>

            <tr>
              <td className={styles.inputTitle}>
                <label htmlFor="searchingBookTitle">
                  ?????????? ???? ???????????????? ??????????:
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
                    src={SearchBookIcon}
                    width={30}
                    height={30}
                    alt="?????????? ??????????"
                  />
                </button>
              </td>
            </tr>

            <tr>
              <td colSpan={2} className={styles.booksContainer}>
                {!(books.length === 0 && searchBookClick) ? (
                  books &&
                  books.map(({
                               id,
                               author,
                               genreTitle,
                               houseTitle,
                               title,
                               year,
                               numberCopies
                             }, index) => {
                    return (
                      <div
                        className={styles.book}
                        key={index}
                      >
                        <div className={styles.bookTitle}>&quot;{title}&quot;</div>
                        <div><b>??????????:</b> {author}</div>
                        <div><b>????????????????????????:</b> {houseTitle}</div>
                        <div><b>????????:</b> {genreTitle}</div>
                        <div><b>?????? ??????????????:</b> {year || '???? ????????????'}</div>

                        <div className={styles.buttonContainer}>
                          <button
                            type="button"
                            onClick={() => {
                              goToEditBook(
                                id,
                                title,
                                author,
                                genreTitle,
                                houseTitle,
                                year,
                                numberCopies
                              );
                            }}
                            className={styles.buttonImage}
                          >
                            <Image
                              src={EditBookIcon}
                              width={30}
                              height={30}
                              alt="?????????????????????????? ??????????"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteBook(title, id)}
                            className={styles.buttonImage}
                          >
                            <Image
                              src={DeleteBookIcon}
                              width={30}
                              height={30}
                              alt="?????????????? ??????????"
                            />
                          </button>
                        </div>
                      </div>

                    );
                  })
                ) : (
                   <div className={styles.nothingSearched}>
                     ?????? ?????????? ????????
                   </div>
                 )}
              </td>
            </tr>
          </table>

          <div className={hideManagementBookMenuClass()}>
            <div
              className={activeAddBookClass()}
              onClick={() => {
                setAddBookLinkClick(true);
                setEditBookLinkClick(false);
                setEditBookClick(false);
              }}
            >
              ???????????????????? ??????????
            </div>

            <div
              className={activeEditBookClass()}
              onClick={() => {
                setAddBookLinkClick(false);
                setEditBookLinkClick(true);
                setEditBookClick(false);
              }}
            >
              ???????????????????????????? ??????????
            </div>
          </div>
        </div>
      </MainPageWrapper>
    </div>
  );
}
