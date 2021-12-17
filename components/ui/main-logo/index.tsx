import styles from "./styles.module.css";
import Image from "next/image";
import Logo from "./library-logo.png";
import Link from "next/link";
import React from "react";

export function MainLogo(): JSX.Element {
  return (
    <Link href="/">
      <a className={styles.link}>
        <div>
          <Image src={Logo} width={50} height={50} alt="Logo"/>
        </div>

        <div className={styles.libraryName}>
          Электронная библиотека "Знания"
        </div>
      </a>
    </Link>
  );
}
