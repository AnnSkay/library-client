import React from 'react';
import styles from './styles.module.css';

export function AuthLeftWrapper(props: any): JSX.Element {
  return (
    <div className={styles.regBlock} {...props} />
  );
}
