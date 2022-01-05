import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

export function ListMenuReaders({ user, page }: { user: any, page: string }): JSX.Element {
  const linkClass = (linkName: string) => cn(styles.link, {
    [styles.linkActive]: page === 'myBooks' && linkName === 'myBooks',
  });

  return (
    <li className={styles.li}>
      <Link href={`/my-books/${user.id}`}>
        <a className={linkClass('myBooks')}>
          Мои книги
        </a>  
      </Link>  
    </li>
  );
}