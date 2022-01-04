import React from 'react';
import styles from './styles.module.css';

export function MainGreeting({ name }: { name: any }): JSX.Element {
  return (
    <h1 className={styles.headerTitle}>
      {name}
      , добро пожаловать в электронную библиотеку!
    </h1>
  );
}
