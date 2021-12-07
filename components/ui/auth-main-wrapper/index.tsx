import React from 'react';
import styles from './styles.module.css';

export function AuthMainWrapper(props: any): JSX.Element {
  return (
    <main className={styles.main} {...props} />
  );
}
