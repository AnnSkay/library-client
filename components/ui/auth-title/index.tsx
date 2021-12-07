import React from 'react';
import styles from '../../../pages/login/styles.module.css';

export function AuthTitle({ title }: { title: string }) {
  return (
    <h1 className={styles.regTitle}>
      {title}
    </h1>
  );
}
