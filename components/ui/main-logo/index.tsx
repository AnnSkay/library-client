import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from './library-logo.png';
import styles from './styles.module.css';

export function MainLogo({link}: { link: string }): JSX.Element {
  return (
    <Link href={link}>
      <a className={styles.link}>
        <div>
          <Image src={Logo} width={50} height={50} alt="Logo" />
        </div>

        <div className={styles.libraryName}>
          Электронная библиотека &quot;Знания&quot;
        </div>
      </a>
    </Link>
  );
}
