import React from "react";
import styles from "./styles.module.css";

export function ListMenuLibrarians(): JSX.Element {
  return (
    <div>
      <li className={styles.li}>Личный кабинет</li>
      <li className={styles.li}>Управление книгами</li>
      <li className={styles.li}>Взятые книги</li>
      <li className={styles.li}>Выйти</li>
    </div>
  );
}
