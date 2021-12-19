import React from "react";
import styles from "./styles.module.css";

export function ListMenuLibrarians(): JSX.Element {
  return (
    <>
      <li className={styles.li}>Управление книгами</li>
      <li className={styles.li}>Взятые книги</li>
    </>
  );
}
