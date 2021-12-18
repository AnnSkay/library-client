import styles from "./styles.module.css";
import React from "react";

export function MainGreeting({ name }: { name: any }): JSX.Element {
  return (
    <h1 className={styles.headerTitle}>
      {name}, добро пожаловать в электронную библиотеку!
    </h1>
  );
}
