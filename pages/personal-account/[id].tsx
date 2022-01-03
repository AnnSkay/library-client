import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {HeadBlock} from '../../components/ui/head-block';
import {MainHeaderWrapper} from "../../components/ui/main-header-wrapper";
import {MainLogo} from "../../components/ui/main-logo";
import {MainMenuUsers} from "../../components/ui/main-menu-users";
import {MainPageWrapper} from "../../components/ui/main-page-wrapper";
import styles from "./styles.module.css";
// @ts-ignore
import ValidatorWrapper, { ValidatorField } from '@coxy/react-validator';
import cn from "classnames";

const myRules = {
  email: [{
    rule: (value: string) => value !== '' && value.length > 0,
    message: 'Email обязателен',
  }, {
    rule: (value: string) => (/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i).test(value),
    message: 'Формат email некорректный',
  }],

  password: [{
    rule: (value: string) => value !== '' && value.length > 0,
    message: 'Пароль обязателен',
  }, {
    rule: (value: string) => value.length > 5,
    message: 'Пароль должен быть не меньше 6 символов',
  }],

  phone: [{
    rule: (value: string) => value !== '' && value.length > 0,
    message: 'Телефон обязателен',
  }, {
    rule: (value: string) => (/^((\+7|7|8)+([0-9]){10})$/).test(value),
    message: 'Формат телефона некорректный',
  }],
};

export default function PersonalAccountPage(): JSX.Element {
  const router = useRouter();

  const [userData, setUserData] = useState({});
  const [id, setId] = useState({});

  const [name, handleChangeName] = useState('');
  const [lastname, handleChangeLastname] = useState('');
  const [email, handleChangeEmail] = useState('');
  const [phone, handleChangePhone] = useState('');

  const getUserName = async () => {
    await axios
    .post('http://localhost:3001/api/user', {
      id
    }).then(response => {
      setUserData(response.data);
      handleChangeName(userData.name);
      handleChangeLastname(userData.lastname);
      handleChangeEmail(userData.login);
      handleChangePhone(userData.phone);
    });
  }  

  useEffect(() => {
    setId(router.query); 
    getUserName();
  }, [router]);

  const validator = useRef<any>();

  interface Validation {
    isValid: boolean;
    message: string;
    errors: string;
  }

  // const handleSubmit = () => {
  //   const { isValid, message, errors }: Validation = validator.current.validate(bytes);
  //
  //   if (!isValid || repeatPass !== password || repeatPass === '') {
  //     console.log(isValid, message, errors);
  //   } else {
  //     // тут будет проверка пользователя в базе по email и добавление пользователя в БД, далее переход в личный кабинет
  //     alert('Изменения прошли успешно');
  //   }
  // };

  const inputClass = (isValid: boolean, inputValue: string) => cn(styles.input, {
    [styles.redBorder]: !isValid && inputValue.length !== 0,
    [styles.greenBorder]: isValid,
  });

  // const repeatPassClass = () => cn(styles.input, {
  //   [styles.redBorder]: password !== repeatPass && password && repeatPass,
  //   [styles.greenBorder]: password === repeatPass && repeatPass,
  // });

  const validationMessageBlock = (validationMessage: string) =>
    <div className={styles.errorInput}>{validationMessage}</div>

  return (
    <div>
      <HeadBlock title="Main Page" />

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${userData.id}`}/>
          <h1 className={styles.headerTitle}>
            Личный кабинет
          </h1>
          <MainMenuUsers user={userData} page={'persAcc'}/>
        </MainHeaderWrapper>

        <table className={styles.personalAccBlock}>
          <ValidatorWrapper ref={validator}>
            <tr className={styles.inputBlock}>
              <td className={styles.inputTitle}>
                <label htmlFor="name">
                  Имя
                </label>
              </td>

              <td>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => handleChangeName(e.target.value)}
                  className={styles.input}
                />
              </td>
            </tr>

            <tr className={styles.inputBlock}>
              <td className={styles.inputTitle}>
                <label htmlFor="lastname">
                  Фамилия
                </label>
              </td>

              <td>
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => handleChangeLastname(e.target.value)}
                  className={styles.input}
                />
              </td>
            </tr>

            <tr className={styles.inputBlock}>
              <td className={styles.inputTitle}>
                <label htmlFor="email">
                  E-mail
                </label>
              </td>

              <td>
                <ValidatorField value={email} rules={myRules.email}>
                  {({ isValid, message }: Validation) => (
                    <>
                      <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={({ target: { value } }) => handleChangeEmail(value)}
                        className={inputClass(isValid, email)}
                      />

                      {!isValid && validationMessageBlock(message)}
                    </>
                  )}
                </ValidatorField>
              </td>
            </tr>

            <tr className={styles.inputBlock}>
              <td className={styles.inputTitle}>
                <label htmlFor="phone">
                  Телефон
                </label>
              </td>

              <td>
                <ValidatorField value={phone} rules={myRules.phone}>
                  {({ isValid, message }: Validation) => (
                    <>
                      <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={({ target: { value } }) => handleChangePhone(value)}
                        className={inputClass(isValid, email)}
                      />

                      {!isValid && validationMessageBlock(message)}
                    </>
                  )}
                </ValidatorField>
              </td>
            </tr>


          </ValidatorWrapper>
        </table>
      </MainPageWrapper>
    </div>
  );
}
