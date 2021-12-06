import type { NextPage } from 'next'
import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import { useState } from "react";

const SignUp: NextPage = () => {
  const [response, setResponse] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    const {data} = await axios.post('http://localhost:3001/api/login', {
      login,
      password
    })
    setResponse(data)
  }

  function showRecovery() {
    let form = document.getElementById('recForm');
    form.style.display = 'block';
  }

  function hideRecovery() {
    let form = document.getElementById('recForm');
    form.style.display = 'none';
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Log in</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.regBlock}>
          <div className={styles.logo}>
            <a href="/">
              <Image src="/libraryLogo.png" width={50} height={50} alt="Логотип" />
            </a>
          </div>
          <div className={styles.registration}>
            <h1 className={styles.regTitle}>
              Вход
            </h1>

            <input value={login} onChange={e => setLogin(e.target.value)} className={styles.input} placeholder="E-mail" />

            <input value={password} onChange={e => setPassword(e.target.value)} className={styles.input} placeholder="Пароль" />

            {(response !== 'failed') ? (
              <div>{response}</div>
            ) : (
              <div className={styles.errorLogin}>Неверный логин/пароль</div>
            )}

            <div className={styles.forgotPass} onClick={showRecovery}>
              <a href="">Забыли пароль?</a>
            </div>

            <button type="submit" onClick={handleLogin} className={styles.button}>Войти</button>

            <div>
              Первый раз у нас? <a href="/sign_up">Зарегистрироваться</a>
            </div>
          </div>

          <div id="recForm" className={styles.recoveryForm}>
            <div className={styles.recoveryClose} onClick={hideRecovery}></div>
            <h2>Восстановление пароля</h2>
            <div className={styles.recoveryDesc}>
              Для получения инструкций по восстановлению пароля введите email, указанный при регистрации
            </div>
            <input type="text" className={styles.input} placeholder="E-mail" />
            <button type="submit" className={styles.button}>Выслать</button>
          </div>
        </div>

        <div className={styles.descBlock}>
          <h1 className={styles.descPhrase}>
            Библиотека — место встречи идей и людей
          </h1>

          <div className={styles.image + ' ' + styles.imageTop}>
            <Image src="/libraryReg1.jpeg" width={150} height={150} alt="Картинка" />
          </div>

          <div className={styles.image + ' ' + styles.imageBottom}>
            <Image src="/libraryReg2.jpg" width={150} height={150} alt="Картинка" />
          </div>

          <div className={styles.shadow + ' ' + styles.shadowBig}></div>
          <div className={styles.shadow + ' ' + styles.shadowNormal}></div>
          <div className={styles.shadow + ' ' + styles.shadowSmallBottom}></div>
          <div className={styles.shadow + ' ' + styles.shadowSmallTop}></div>
        </div>
      </main>

    </div>
  )
}

export default SignUp