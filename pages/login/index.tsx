import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import cn from 'classnames';
import Router from 'next/router';
import styles from './styles.module.css';
import { AuthMainWrapper } from '../../components/ui/auth-main-wrapper';
import { AuthTitle } from '../../components/ui/auth-title';
import { AuthLogo } from '../../components/ui/auth-logo';
import { AuthDescription } from '../../components/ui/auth-description';
import { AuthLeftWrapper } from '../../components/ui/auth-left-wrapper';
import { HeadBlock } from '../../components/ui/head-block';

export default function LogInPage(): JSX.Element {
  const [serverAnswer, setServerAnswer] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showRecoveryForm, isShowRecoveryFrom] = useState(false);

  const showRecoveryClass = () => cn(styles.recoveryBlock, {
    [styles.recoveryOpened]: showRecoveryForm,
  });

  async function handleLogin() {
    await axios
      .post('http://localhost:3001/api/login', {
        login,
        password,
      }).then((response) => {
        setServerAnswer(response.data);
        if (response.data !== 'failed') {
          Router.push(`/main-users/${response.data}`);
        }
      });
  }

  const showRecovery = () => isShowRecoveryFrom(true);
  const hideRecovery = () => isShowRecoveryFrom(false);

  return (
    <div className={styles.container}>
      <HeadBlock title="Log in" />

      <AuthMainWrapper>
        <AuthLeftWrapper>
          <AuthLogo />

          <div className={styles.registration}>
            <AuthTitle title="Вход" />

            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className={styles.input}
              placeholder="E-mail"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Пароль"
            />

            {(serverAnswer === 'failed') ? (
              <div className={styles.errorLogin}>Неверный логин/пароль</div>
            ) : null
            }

            <div className={styles.forgotPass} onClick={showRecovery}>
              <u>Забыли пароль?</u>
            </div>

            <button
              type="submit"
              onClick={handleLogin}
              className={styles.button}
            >
              Войти
            </button>

            <div className={styles.linkToAuth}>
              Первый раз у нас?
              {' '}
              <Link href="../signup">
                <a>Зарегистрироваться</a>
              </Link>
            </div>
          </div>
        </AuthLeftWrapper>

        <AuthDescription />
      </AuthMainWrapper>

      <div className={showRecoveryClass()}>
        <div className={styles.recoveryForm}>
          <div className={styles.recoveryClose} onClick={hideRecovery} />
          <h2>Восстановление пароля</h2>

          <div className={styles.recoveryDesc}>
            Для получения инструкций по восстановлению пароля введите email,
            указанный при регистрации
          </div>

          <input type="text" className={styles.input} placeholder="E-mail" />

          <button type="submit" className={styles.button}>
            Выслать
          </button>
        </div>

        <div className={styles.blackout} onClick={hideRecovery} />
      </div>
    </div>
  );
}
