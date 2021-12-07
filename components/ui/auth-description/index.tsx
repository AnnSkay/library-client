import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export function AuthDescription() {
  return (
    <div className={styles.descBlock}>
      <h1 className={styles.descPhrase}>
        Библиотека — место встречи идей и людей
      </h1>

      <div className={`${styles.image} ${styles.imageTop}`}>
        <Image src="/libraryReg1.jpeg" width={150} height={150} alt="Картинка" />
      </div>

      <div className={`${styles.image} ${styles.imageBottom}`}>
        <Image src="/libraryReg2.jpg" width={150} height={150} alt="Картинка" />
      </div>

      <div className={`${styles.shadow} ${styles.shadowBig}`} />
      <div className={`${styles.shadow} ${styles.shadowNormal}`} />
      <div className={`${styles.shadow} ${styles.shadowSmallBottom}`} />
      <div className={`${styles.shadow} ${styles.shadowSmallTop}`} />
    </div>
  );
}
