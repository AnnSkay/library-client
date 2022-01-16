import React from 'react';
import styles from './styles.module.css';

export function AuthLeftWrapper(props: Record<string, unknown>): JSX.Element {
  return (
    <div className={styles.regBlock} {...props} />
  );
}
