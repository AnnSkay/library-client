import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import { HeadBlock } from '../../components/ui/head-block';
import { MainHeaderWrapper } from '../../components/ui/main-header-wrapper';
import { MainLogo } from '../../components/ui/main-logo';
import { MainMenuUsers } from '../../components/ui/main-menu-users';
import { MainPageWrapper } from '../../components/ui/main-page-wrapper';
import styles from './styles.module.css';

export default function ListBorrowedBooksPage(): JSX.Element {
  interface UserDataType {
    id: number;
    name: string;
    lastname: string;
    login: string;
    password: string;
    role: string;
    phone: string;
  }

  interface BookType {
    id: number;
    title: string;
    author: string;
    houseId: number;
    houseTitle: string;
    genreId: number;
    genreTitle: string;
    year: number;
    dateIssue: string;
    dateIssueFormat: string;
    userName: string;
    userLastname: string;
    userEmail: string;
    userPhone: string;
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

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [booksFilter, setBooksFilter] = useState([]);

  const [sorting, setSorting] = useState('');
  const [userLastname, setUserLastname] = useState('');

  const getUserData = async () => {
    await api
      .post('/users/user-data', {
        id
      })
      .then((response) => {
        setUserData(response.data);
      });
  };

  const getBorrowedBooks = async () => {
    await api
      .get('/books/all-borrowed')
      .then((response) => {
        setBorrowedBooks(response.data);
        setBooksFilter(response.data);
        console.log(booksFilter);
      });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserData();
    getBorrowedBooks();
  }, [id]);

  const getSort = (sortingName: string) => {
    setSorting(sortingName);

    getFilterByUser(userLastname);

    switch (sortingName) {
      case 'По названию книги':
        setBorrowedBooks(
          borrowedBooks.sort((prev: BookType, next: BookType) =>
            prev.title < next.title ? -1 : 1
          )
        );
        setBooksFilter(
          borrowedBooks.filter((book: BookType) =>
            book.userLastname.includes(userLastname)
          )
        );
        return;
      case 'По автору':
        setBorrowedBooks(
          borrowedBooks.sort((prev: BookType, next: BookType) =>
            prev.author < next.author ? -1 : 1
          )
        );
        setBooksFilter(
          borrowedBooks.filter((book: BookType) =>
            book.userLastname.includes(userLastname)
          )
        );
        return;
      case 'По фамилии читателя':
        setBorrowedBooks(
          borrowedBooks.sort((prev: BookType, next: BookType) =>
            prev.userLastname < next.userLastname ? -1 : 1
          )
        );
        setBooksFilter(
          borrowedBooks.filter((book: BookType) =>
            book.userLastname.includes(userLastname)
          )
        );
        return;
      case 'По дате выдачи книги':
        setBorrowedBooks(
          borrowedBooks.sort((prev: BookType, next: BookType) =>
            Date.parse(prev.dateIssue) - Date.parse(next.dateIssue)
          )
        );
        setBooksFilter(
          borrowedBooks.filter((book: BookType) =>
            book.userLastname.includes(userLastname)
          )
        );
    }
  };

  const getFilterByUser = (userLastname: string) => {
    setUserLastname(userLastname);

    setBooksFilter(borrowedBooks.filter((book: BookType) => book.userLastname.includes(userLastname)));
  };

  return (
    <div>
      <HeadBlock title="Borrowed books"/>

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${id}`}/>
          <h1 className={styles.headerTitle}>
            Список взятых книг
          </h1>
          <MainMenuUsers user={userData} page="borrowedBooks"/>
        </MainHeaderWrapper>

        <div className={styles.inputBlock}>
          <div className={styles.inputTitle}>
            <label htmlFor="sorting">
              Сортировка:
            </label>
            <select
              id="sorting"
              name="sorting"
              value={sorting}
              onChange={(e) => getSort(e.target.value)}
              className={styles.input}
            >
              <option hidden selected disabled/>
              <option>
                По названию книги
              </option>
              <option>
                По автору
              </option>
              <option>
                По фамилии читателя
              </option>
              <option>
                По дате выдачи книги
              </option>
            </select>
          </div>

          <div className={styles.inputTitle}>
            <label htmlFor="userLastname">
              Поиск по фамилии читателя:
            </label>
            <input
              type="text"
              id="userLastname"
              name="userLastname"
              value={userLastname}
              onChange={(e) => getFilterByUser(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.booksContainer}>
          {!(booksFilter.length === 0) ? (
            booksFilter &&
            booksFilter.map(({
                               author,
                               genreTitle,
                               houseTitle,
                               title,
                               year,
                               dateIssueFormat,
                               userName,
                               userLastname,
                               userEmail,
                               userPhone
                             }, index) => {
              return (
                <div className={styles.book} key={index}>
                  <div className={styles.bookTitle}>&quot;{title}&quot;</div>
                  <div><b>Автор:</b> {author}</div>
                  <div><b>Издательство:</b> {houseTitle}</div>
                  <div><b>Жанр:</b> {genreTitle}</div>
                  <div><b>Год издания:</b> {year || 'Не указан'}</div>
                  <div><b>Кем взята:</b></div>
                  <div className={styles.userInf}><b>ФИ:</b> {userLastname} {userName}</div>
                  <div className={styles.userInf}><b>Почта:</b> {userEmail}</div>
                  <div className={styles.userInf}><b>Телефон:</b> {userPhone}</div>
                  <div className={styles.userInf}>
                    <b>Дата выдачи книги:</b> {dateIssueFormat}
                  </div>
                </div>
              );
            })
          ) : (
             <div className={styles.nothingSearched}>
               Нет взятых книг
             </div>
           )}
        </div>
      </MainPageWrapper>
    </div>
  );
}
