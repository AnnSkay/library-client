import React from "react";
import styles from "./styles.module.css";

export function ListMenuUsers(): JSX.Element {
  return (
      <div>
        <li className={styles.li}>Главная</li>
        <li className={styles.li}>Мои книги</li>
        <li className={styles.li}>Личный кабинет</li>
      </div>
  );
}
