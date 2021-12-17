import styles from "./styles.module.css";
import Link from "next/link";
import React from "react";

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
