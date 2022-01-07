import React from 'react';
import styles from './styles.module.css';

export function MainPageWrapper(props: Record<string, unknown>): JSX.Element {
  return (
    <div className={styles.mainWrapper} {...props} />
  );
}
