import api from '../../services/api';
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
  const [serverAnswer, setServerAnswer] = useState(false);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPopupForm, isShowPopupFrom] = useState(false);

  const [handleLoginClick, isHandleLoginClick] = useState(false);

  const showPopupClass = () => cn(styles.popupBlock, {
    [styles.popupOpened]: showPopupForm
  });

  async function handleLogin() {
    isHandleLoginClick(true);
    await api
      .post('/users/login', {
        login,
        password
      })
      .then((response) => {
        console.log(response);
        if (response.data.isSuccess) {
          setServerAnswer(response.data.isSuccess);
          Router.push(`/main-users/${response.data.id}`);
        }
      });
  }

  const showPopup = () => isShowPopupFrom(true);
  const hidePopup = () => isShowPopupFrom(false);

  return (
    <div className={styles.container}>
      <HeadBlock title="Log in"/>

      <AuthMainWrapper>
        <AuthLeftWrapper>
          <AuthLogo/>

          <div className={styles.registration}>
            <AuthTitle title="Вход"/>

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

            {
              (!serverAnswer && handleLoginClick) ? (
                <div className={styles.errorLogin}>Неверный логин/пароль</div>
              ) : null
            }

            <div className={styles.forgotPass} onClick={showPopup}>
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

        <AuthDescription/>
      </AuthMainWrapper>

      <div className={showPopupClass()}>
        <div className={styles.popupForm}>
          <div className={styles.popupClose} onClick={hidePopup}/>
          <h2>Восстановление пароля</h2>

          <div className={styles.recoveryDesc}>
            Для получения инструкций по восстановлению пароля введите email,
            указанный при регистрации
          </div>

          <input type="text" className={styles.input} placeholder="E-mail"/>

          <button type="submit" className={styles.button}>
            Выслать
          </button>
        </div>

        <div className={styles.popupBlackout} onClick={hidePopup}/>
      </div>
    </div>
  );
}
