import type { NextPage } from 'next'
import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import React, { useState } from "react";
import ValidatorWrapper, { rules, ValidatorField } from '@coxy/react-validator';

const validator = React.createRef();

const rules = {
  email: [{
    rule: value => value !== '' && value.length > 0,
    message: 'Email обязателен',
  }, {
    rule: value => (/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i).test(value),
    message: 'Формат email неккоректный',
  }],
  password: [{
    rule: value => value !== '' && value.length > 0,
    message: 'Пароль обязателен',
  }, {
    rule: value => value.length > 5,
    message: 'Пароль должен быть не меньше 6 символов',
  }],
  phone: [{
    rule: value => value !== '' && value.length > 0,
    message: 'Телефон обязателен',
  }, {
    rule: value => (/^((\+7|7|8)+([0-9]){10})$/).test(value),
    message: 'Формат телефона неккоректный'
  }]
}

const handleSubmit = () => {
  const { isValid, message, errors } = validator.current.validate();
  if (!isValid) {
    console.log(isValid, message, errors);
    return;
  }
  // Success
};

const SignUp: NextPage = () => {

  const [email, handleChangeEmail] = useState('');
  const [phone, handleChangePhone] = useState('');
  const [password, handleChangePassword] = useState('');
  const [repeatPass, handleChangeRepeatPass] = useState('');

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

            <ValidatorWrapper ref={validator}>

              <div className={styles.blockInput}>
                <input type="text" className={styles.input + ' ' + styles.inputPartOne} placeholder="Имя" />
                <input type="text" className={styles.input + ' ' + styles.inputPartTwo} placeholder="Фамилия"  />
              </div>

              <ValidatorField value={email} rules={rules.email}>
                {({ isValid, message }) => (
                  <>
                    <input
                      type="text"
                      value={email}
                      onChange={({ target: { value } }) => handleChangeEmail(value)}
                      className={ !isValid && email.length !== 0 ? styles.input + ' ' + styles.redBorder : email.length !== 0 ? styles.input + ' ' + styles.greenBorder: styles.input }
                      placeholder="E-mail"
                    />
                    {!isValid && <div className={styles.errorInput}>{message}</div>}
                  </>
                )}
              </ValidatorField>

              <ValidatorField value={phone} rules={rules.phone}>
                {({ isValid, message }) => (
                  <>
                    <input
                      type="text"
                      value={phone}
                      onChange={({ target: { value } }) => handleChangePhone(value)}
                      className={ !isValid && phone.length !== 0 ? styles.input + ' ' + styles.redBorder : phone.length !== 0 ? styles.input + ' ' + styles.greenBorder: styles.input }
                      placeholder="Телефон"
                    />
                    {!isValid && <div className={styles.errorInput}>{message}</div>}
                  </>
                )}
              </ValidatorField>

              <ValidatorField value={password} rules={rules.password}>
                {({ isValid, message }) => (
                  <>
                    <input
                      type="password"
                      value={password}
                      onChange={({ target: { value } }) => handleChangePassword(value)}
                      className={ !isValid && password.length !== 0 ? styles.input + ' ' + styles.redBorder : password.length !== 0 ? styles.input + ' ' + styles.greenBorder: styles.input }
                      placeholder="Пароль"
                    />
                    {!isValid && <div className={styles.errorInput}>{message}</div>}
                  </>
                )}
              </ValidatorField>

              <input
                type="password"
                value={repeatPass}
                onChange={({ target: { value } }) => handleChangeRepeatPass(value)}
                className={ (password !== repeatPass) && password && repeatPass ? styles.input + ' ' + styles.redBorder : password === repeatPass && repeatPass ? styles.input + ' ' + styles.greenBorder: styles.input }
                placeholder="Повторите пароль"
              />
              { (password !== repeatPass) && password && repeatPass ?
                <div className={styles.errorInput}>Пароли не совпадают</div>
                : null
              }

              <button className={styles.button} onClick={handleSubmit} type="button">Зарегистрироваться</button>

            </ValidatorWrapper>

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