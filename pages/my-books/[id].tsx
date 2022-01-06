import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cn from 'classnames';
import { HeadBlock } from '../../components/ui/head-block';
import { MainHeaderWrapper } from '../../components/ui/main-header-wrapper';
import { MainLogo } from '../../components/ui/main-logo';
import { MainMenuUsers } from '../../components/ui/main-menu-users';
import { MainPageWrapper } from '../../components/ui/main-page-wrapper';
import styles from './styles.module.css';

export default function MyBooksPage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const [userData, setUserData] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const getUserData = async (id: string) => {
    await axios
      .post('http://localhost:3001/api/user', {
        id
      }).then((response) => {
        setUserData(response.data);
      });
  }

  const getBorrowedUserBooks = async (id: string) => {
    await axios
      .post('http://localhost:3001/api/borrowedBooks', {
        id
      }).then((response) => {
        setBorrowedBooks(response.data);
      });
  }

  const deleteReturnedBook = async (bookId: string) => {
    await axios
      .post('http://localhost:3001/api/returnBook', {
        bookId,
        id
      }).then((response) => {
        alert('Книга возвращена');
        getBorrowedUserBooks(id);
      });
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserData(id);
    getBorrowedUserBooks(id);
  }, [id]);

  const returnBook = (title: string, bookId: number) => {
    if (confirm(`Вы уверены, что хотите вернуть книгу "${title}"?`)) {
      deleteReturnedBook(String(bookId));
    }
  }

  return (
    <div>
      <HeadBlock title="Main Page" />

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${id}`} />
          <h1 className={styles.headerTitle}>
            Мои книги
          </h1>
          <MainMenuUsers user={userData} page="myBooks" />
        </MainHeaderWrapper>

        <div className={styles.booksContainer}>
          {!(borrowedBooks.length === 0) ? (
            borrowedBooks &&
            borrowedBooks.map(({
              id,
              author,
              genreTitle,
              houseTitle,
              title,
              year,
              dateIssue
            }, index) => {
              return (
                <div
                  className={styles.book}
                  key={index}
                  onClick={() => returnBook(title, id)}
                >
                  <div className={styles.bookTitle}>&quot;{title}&quot;</div>
                  <div><b>Автор:</b> {author}</div>
                  <div><b>Издательство:</b> {houseTitle}</div>
                  <div><b>Жанр:</b> {genreTitle}</div>
                  <div><b>Год издания:</b> {year}</div>
                  <div><b>Дата выдачи книги:</b> {dateIssue}</div>
                </div>
              );
            })
          ) : (
            <div className={styles.nothingSearched}>
              У вас нет выданных книг
            </div>
          )}
        </div>
      </MainPageWrapper>
    </div>
  );
}
