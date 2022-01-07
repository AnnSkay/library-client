import Link from 'next/link';
import React from 'react';
import styles from './styles.module.css';

export function LoginToAccountLink(): JSX.Element {
  return (
    <div className={styles.authorization}>
      <Link href={"./login"}>
        <a className={styles.link}>
          Личный кабинет
        </a>
      </Link>
    </div>
  );
}
