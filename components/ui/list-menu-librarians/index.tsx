import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import styles from './styles.module.css';

export function ListMenuLibrarians({ user, page }: { user: {id: number}, page: string }): JSX.Element {
  const linkClass = (linkName: string) => cn(styles.link, {
    [styles.linkActive]: page === 'borrowedBooks' && linkName === 'borrowedBooks'
  });

  return (
    <>
      <li className={styles.li}>Управление книгами</li>

      <li className={styles.li}>
        <Link href={`/list-borrowed-books/${user.id}`}>
          <a className={linkClass('borrowedBooks')}>
            Взятые книги
          </a>
        </Link>  
      </li>
    </>
  );
}
