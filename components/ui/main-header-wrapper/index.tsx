import React from 'react';
import styles from './styles.module.css';

export function MainHeaderWrapper(props: Record<string, unknown>): JSX.Element {
  return (
    <div className={styles.header} {...props} />
  );
}
