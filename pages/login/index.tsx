import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from './styles.module.css';
import { AuthMainWrapper } from '../../components/ui/auth-main-wrapper';
import { AuthTitle } from '../../components/ui/auth-title';
import { AuthLogo } from '../../components/ui/auth-logo';
import { AuthDescription } from '../../components/ui/auth-description';

export default function PageLogin(): JSX.Element {
  const [response, setResponse] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [click, isClick] = useState(false);

  async function handleLogin() {
    const { data } = await axios.post('http://localhost:3001/api/login', {
      login,
      password,
    });
    setResponse(data);
  }

  const showRecovery = () => isClick(true);
  const hideRecovery = () => isClick(false);

  return (
    <div className={styles.container}>

      <Head>
        <title>Log in</title>
      </Head>

      <AuthMainWrapper>
        <div className={styles.regBlock}>
          <AuthLogo />
          <div className={styles.registration}>
            <AuthTitle title="Вход" />

            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className={styles.input}
              placeholder="E-mail"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Пароль"
            />

            {(response !== 'failed') ? (
              <div>{response}</div>
            ) : (
              <div className={styles.errorLogin}>Неверный логин/пароль</div>
            )}

            <div className={styles.forgotPass} onClick={showRecovery}>
              <u>Забыли пароль?</u>
            </div>

            <button type="submit" onClick={handleLogin} className={styles.button}>Войти</button>

            <div>
              Первый раз у нас?
              {' '}
              <Link href="/signup">
                <a>Зарегистрироваться</a>
              </Link>
            </div>
          </div>
        </div>
        <AuthDescription />
      </AuthMainWrapper>

      <div className={click ? (`${styles.recoveryBlock} ${styles.recoveryOpened}`) : (styles.recoveryBlock)}>
        <div className={styles.recoveryForm}>
          <div className={styles.recoveryClose} onClick={hideRecovery} />
          <h2>Восстановление пароля</h2>

          <div className={styles.recoveryDesc}>
            Для получения инструкций по восстановлению пароля введите email,
            указанный при регистрации
          </div>

          <input type="text" className={styles.input} placeholder="E-mail" />
          <button type="submit" className={styles.button}>Выслать</button>
        </div>
        <div className={styles.blackout} onClick={hideRecovery} />
      </div>
    </div>
  );
}
