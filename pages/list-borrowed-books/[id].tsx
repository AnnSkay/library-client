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
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const getUserData = async () => {
    await axios
      .post('http://localhost:3001/api/user', {
        id
      }).then((response) => {
        setUserData(response.data);
      });
  }

  const getBorrowedBooks = async () => {
    await axios
      .get('http://localhost:3001/api/allBorrowedBooks')
      .then((response) => {
        setBorrowedBooks(response.data);
      });
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserData();
    getBorrowedBooks();
  }, [id]);

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

        <div className={styles.booksContainer}>
          {!(borrowedBooks.length === 0) ? (
            borrowedBooks &&
            borrowedBooks.map(({
              author,
              genreTitle,
              houseTitle,
              title,
              year,
              dateIssue,
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
                  <div><b>Год издания:</b> {year}</div>
                  <div><b>Кем взята:</b></div>
                  <div className={styles.userInf}><b>ФИ:</b> {userLastname} {userName}</div>
                  <div className={styles.userInf}><b>Почта:</b> {userEmail}</div>
                  <div className={styles.userInf}><b>Телефон:</b> {userPhone}</div>
                  <div className={styles.userInf}><b>Дата выдачи книги:</b> {dateIssue}</div>
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
