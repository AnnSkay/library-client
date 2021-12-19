import React from "react";
import styles from "./styles.module.css";

export function ListMenuReaders(): JSX.Element {
  return (
      <>
        <li className={styles.li}>Личный кабинет</li>
        <li className={styles.li}>Мои книги</li>
        <li className={styles.li}>Выйти</li>
      </>
  );
}
