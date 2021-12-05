import type { NextPage } from 'next'
import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import { useState } from "react";

const SignUp: NextPage = () => {
  return (
    <div className={styles.container}>
      
      <Head>
        <title>Sign up</title>
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
              Регистрация
            </h1>

            <div className={styles.blockInput}>
              <input type="text" className={styles.input + ' ' + styles.inputPartOne} placeholder="Имя" required />
              <input type="text" className={styles.input + ' ' + styles.inputPartTwo} placeholder="Фамилия" required />
            </div>

            <input type="email" className={styles.input} placeholder="E-mail" required />

            <div className={styles.blockInput}>
              <input type="text" className={styles.input + ' ' + styles.inputPartOne} placeholder="День Рождения" required />
              <input type="text" className={styles.input + ' ' + styles.inputPartTwo} placeholder="Телефон" required />
            </div>

            <input type="password" className={styles.input} placeholder="Пароль" required />
            <input type="password" className={styles.input} placeholder="Повторите пароль" required />

            <button className={styles.button}>Зарегистрироваться</button>

            <div>
              Уже участник? <a href="/log_in" className={styles.loginLink}>Войти</a>
            </div>
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