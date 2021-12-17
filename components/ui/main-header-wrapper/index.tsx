import styles from "./styles.module.css";
import React from "react";

export function MainHeaderWrapper(props: any): JSX.Element {
  return (
    <div className={styles.header} {...props} />
  );
}
