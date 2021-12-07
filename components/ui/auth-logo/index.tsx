import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';

export function AuthLogo() {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <a>
          <Image src="/libraryLogo.png" width={50} height={50} alt="Library" />
        </a>
      </Link>
    </div>
  );
}
