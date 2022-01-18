import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import cn from 'classnames';

export function ListMenuAdmins({
                                 user,
                                 page
                               }: { user: { id: number }, page: string }): JSX.Element {
  const linkClass = (linkName: string) => cn(styles.link, {
    [styles.linkActive]: page === 'usersManagement' && linkName === 'usersManagement' ||
                         page === 'booksManagement' && linkName === 'booksManagement'
  });

  return (
    <>
      <li className={styles.li}>
        <Link href={`/users-management/${user.id}`}>
          <a className={linkClass('usersManagement')}>
            Управление пользователями
          </a>
        </Link>
      </li>

      <li className={styles.li}>
        <Link href={`/books-management/${user.id}`}>
          <a className={linkClass('booksManagement')}>
            Управление книгами
          </a>
        </Link>
      </li>
    </>
  );
}
