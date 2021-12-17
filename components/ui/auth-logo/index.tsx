import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';
import Logo from '../main-logo/library-logo.png';

export function AuthLogo() {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <a>
          <Image src={Logo} width={50} height={50} alt="Logo" />
        </a>
      </Link>
    </div>
  );
}
