import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "./library-logo.png";
import React from "react";

export function HeaderBlock(): JSX.Element {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.link}>
          <div className={styles.logo}>
            <Image src={Logo} width={50} height={50} alt="Logo"/>
          </div>

          <div className={styles.libraryName}>
            Электронная библиотека "Знания"
          </div>
        </a>
      </Link>

      <h1 className={styles.headerTitle}>
        Добро пожаловать в электронную библиотеку!
      </h1>

      <div className={styles.authorization}>
        <Link href="../login">
          <a className={styles.link}>
            Личный кабинет
          </a>
        </Link>
      </div>
    </div>
  );
}
