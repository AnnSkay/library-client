import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { HeadBlock } from '../../components/ui/head-block';
import { MainHeaderWrapper } from '../../components/ui/main-header-wrapper';
import { MainLogo } from '../../components/ui/main-logo';
import { MainMenuUsers } from '../../components/ui/main-menu-users';
import { MainPageWrapper } from '../../components/ui/main-page-wrapper';
import styles from './styles.module.css';

export default function ListBorrowedBooksPage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const [userData, setUserData]: any = useState({});
  let [borrowedBooks, setBorrowedBooks] = useState([]);

  const [sorting, setSorting] = useState('');
  const [booksFilter, setBooksFilter] = useState([]);
  const [userLastname, setUserLastname] = useState('');

  const getUserData = async () => {
    await axios
      .post('http://localhost:3002/api/user', {
        id
      }).then((response) => {
        setUserData(response.data);
      });
  }

  const getBorrowedBooks = async () => {
    await axios
      .get('http://localhost:3002/api/allBorrowedBooks')
      .then((response) => {
        response.data.sort((prev: any, next: any) => {
          if ( prev.title < next.title ) return -1;
          if ( prev.title < next.title ) return 1;
        });
        setBorrowedBooks(response.data);
        setBooksFilter(response.data);
      });
  }

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
        setBorrowedBooks(borrowedBooks.sort((prev: any, next: any): any => {
          if ( prev.title < next.title ) return -1;
          if ( prev.title < next.title ) return 1;
        }));
        setBooksFilter(borrowedBooks.filter((book: any) => book.userLastname.includes(userLastname)));

        return;
      case 'По автору':
        setBorrowedBooks(borrowedBooks = borrowedBooks.sort((prev: any, next: any): any => {
          if ( prev.author < next.author ) return -1;
          if ( prev.author < next.author ) return 1;
        }));
        setBooksFilter(borrowedBooks.filter((book: any) => book.userLastname.includes(userLastname)));

        return;
      case 'По фамилии читателя':
        setBorrowedBooks(borrowedBooks = borrowedBooks.sort((prev: any, next: any): any => {
          if ( prev.userLastname < next.userLastname ) return -1;
          if ( prev.userLastname < next.userLastname ) return 1;
        }));
        setBooksFilter(borrowedBooks.filter((book: any) => book.userLastname.includes(userLastname)));

        return;
      case 'По дате выдачи книги':
        setBorrowedBooks(borrowedBooks = borrowedBooks.sort((prev: any, next: any): any => {
          if ( Date.parse(prev.dateIssue) < Date.parse(next.dateIssue) ) return -1;
          if ( Date.parse(prev.dateIssue) < Date.parse(next.dateIssue) ) return 1;
        }));
        setBooksFilter(borrowedBooks.filter((book: any) => book.userLastname.includes(userLastname)));
    }
  }

  const getFilterByUser = (userLastname: string) => {
    setUserLastname(userLastname);

    setBooksFilter(borrowedBooks.filter((book: any) => book.userLastname.includes(userLastname)));
  }

  return (
    <div>
      <HeadBlock title="Borrowed books" />

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${id}`} />
          <h1 className={styles.headerTitle}>
            Список взятых книг
          </h1>
          <MainMenuUsers user={userData} page="borrowedBooks" />
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
              <option hidden selected disabled />
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
                  <div
                    className={styles.book}
                    key={index}
                  >
                    <div className={styles.bookTitle}>&quot;{title}&quot;</div>
                    <div><b>Автор:</b> {author}</div>
                    <div><b>Издательство:</b> {houseTitle}</div>
                    <div><b>Жанр:</b> {genreTitle}</div>
                    <div><b>Год издания:</b> {year || 'Не указан'}</div>
                    <div><b>Кем взята:</b></div>
                    <div className={styles.userInf}><b>ФИ:</b> {userLastname} {userName}</div>
                    <div className={styles.userInf}><b>Почта:</b> {userEmail}</div>
                    <div className={styles.userInf}><b>Телефон:</b> {userPhone}</div>
                    <div className={styles.userInf}><b>Дата выдачи книги:</b> {dateIssueFormat}
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
