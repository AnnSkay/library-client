import React from 'react';
import styles from './styles.module.css';

export function MainHeaderWrapper(props: any): JSX.Element {
  return (
    <div className={styles.header} {...props} />
  );
}
