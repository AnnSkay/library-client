import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// @ts-ignore
import ValidatorWrapper, { ValidatorField } from '@coxy/react-validator';
import cn from 'classnames';
import { HeadBlock } from '../../components/ui/head-block';
import { MainHeaderWrapper } from '../../components/ui/main-header-wrapper';
import { MainLogo } from '../../components/ui/main-logo';
import { MainMenuUsers } from '../../components/ui/main-menu-users';
import { MainPageWrapper } from '../../components/ui/main-page-wrapper';
import styles from './styles.module.css';

const myRules = {
  email: [{
    rule: (value: string) => value !== '' && value.length > 0,
    message: 'Email обязателен',
  }, {
    rule: (value: string) => (/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i).test(value),
    message: 'Формат email некорректный',
  }],

  newPassword: [{
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

export default function PersonalAccountPage(bytes: BufferSource): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const [userData, setUserData]: any = useState({});
  const [changeDataClick, setChangeDataClick] = useState(true);
  const [changePassordClick, setChangePassordClick] = useState(false);

  const [userValue, setUserValue] = useState({
    userId: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  });

  const inputOnChange = ({ target }: any) => {
    setUserValue({ ...userValue, [target.name]: target.value });
  }

  const validator = useRef<any>();

  interface Validation {
    isValid: boolean;
    message: string;
    errors: string;
  }

  const getUserData = async () => {
    await axios
      .post('http://localhost:3002/api/user', {
        id
      }).then((response) => {
        setUserData(response.data);
        setUserValue({
          ...userValue,
          userId: response.data.id,
          name: response.data.name,
          lastname: response.data.lastname,
          email: response.data.login,
          phone: response.data.phone
        });
      });
  }

  const sendDataChange = async () => {
    await axios
      .post('http://localhost:3002/api/changeUserData', {
        ...userValue
      }).then((response) => {
        setUserData(response.data);
        setUserValue({
          ...userValue,
          name: response.data.name,
          lastname: response.data.lastname,
          email: response.data.login,
          phone: response.data.phone
        });
      });
  }

  const sendPasswordChange = async () => {
    await axios
      .post('http://localhost:3002/api/changeUserPassword', {
        ...userValue
      }).then((response) => {
        setUserData(response.data);
      });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserData();
  }, [id]);

  const inputClass = (isValid: boolean, inputValue: string) => cn(styles.input, {
    [styles.redBorder]: !isValid && inputValue.length !== 0,
    [styles.greenBorder]: isValid,
  });

  const repeatNewPassordClass = () => cn(styles.input, {
    [styles.redBorder]: userValue.newPassword !== userValue.repeatNewPassword
                        && userValue.newPassword
                        && userValue.repeatNewPassword,
    [styles.greenBorder]: userValue.newPassword === userValue.repeatNewPassword
                          && userValue.repeatNewPassword,
  });

  const validationMessageBlock = (validationMessage: string) =>
    <div className={styles.errorInput}>{validationMessage}</div>

  const changeDataTableClass = () => cn(styles.personalAccBlock, {
    [styles.noDisplay]: !changeDataClick,
  });

  const changePassordTableClass = () => cn(styles.personalAccBlock, {
    [styles.noDisplay]: !changePassordClick,
  });

  const activeDataItemClass = () => cn(styles.menuChangeItem, {
    [styles.activeItem]: changeDataClick,
  });

  const activePasswordItemClass = () => cn(styles.menuChangeItem, {
    [styles.activeItem]: changePassordClick,
  });

  const handleDataSubmit = () => {
    const { isValid, message, errors }: Validation = validator.current.validate(bytes);

    if (!isValid && message !== 'Пароль обязателен' && message !== 'Пароль должен быть не меньше 6 символов') {
      console.log(isValid, message, errors);
    } else {
      sendDataChange();
      alert('Изменения прошли успешно');
    }
  };

  const handlePasswordSubmit = () => {
    const { isValid, message, errors }: Validation = validator.current.validate(bytes);

    if (userValue.oldPassword !== userData.password || userValue.repeatNewPassword !== userValue.newPassword || userValue.repeatNewPassword === '') {
      console.log(isValid, message, errors);
    } else {
      sendPasswordChange();
      alert('Изменения прошли успешно');
    }
  };

  return (
    <div>
      <HeadBlock title="Personal account" />

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${userData.id}`} />
          <h1 className={styles.headerTitle}>
            Личный кабинет
          </h1>
          <MainMenuUsers user={userData} page="persAcc" />
        </MainHeaderWrapper>

        <div className={styles.flexBox}>
          <ValidatorWrapper ref={validator}>
            <table className={changeDataTableClass()}>
              <tr className={cn(styles.inputBlock, styles.twoColumns)}>
                <td colSpan={2}>
                  Смена личных данных
                </td>
              </tr>

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
                    name="name"
                    value={userValue.name}
                    onChange={inputOnChange}
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
                    name="lastname"
                    value={userValue.lastname}
                    onChange={inputOnChange}
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
                  <ValidatorField value={userValue.email} rules={myRules.email}>
                    {({ isValid, message }: Validation) => (
                      <>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={userValue.email}
                          onChange={inputOnChange}
                          className={inputClass(isValid, userValue.email)}
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
                  <ValidatorField value={userValue.phone} rules={myRules.phone}>
                    {({ isValid, message }: Validation) => (
                      <>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={userValue.phone}
                          onChange={inputOnChange}
                          className={inputClass(isValid, userValue.phone)}
                        />

                        {!isValid && validationMessageBlock(message)}
                      </>
                    )}
                  </ValidatorField>
                </td>
              </tr>

              <tr className={cn(styles.inputBlock, styles.twoColumns)}>
                <td colSpan={2}>
                  <button
                    type="button"
                    onClick={handleDataSubmit}
                    className={styles.button}
                  >
                    Изменить данные
                  </button>
                </td>
              </tr>
            </table>

            <table className={changePassordTableClass()}>
              <tr className={cn(styles.inputBlock, styles.twoColumns)}>
                <td colSpan={2}>
                  Смена пароля
                </td>
              </tr>

              <tr className={styles.inputBlock}>
                <td className={styles.inputTitle}>
                  <label htmlFor="oldPassword">
                    Старый пароль
                  </label>
                </td>

                <td>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={userValue.oldPassword}
                    onChange={inputOnChange}
                    className={styles.input}
                  />
                </td>
              </tr>

              <tr className={styles.inputBlock}>
                <td className={styles.inputTitle}>
                  <label htmlFor="newPassword">
                    Новый пароль
                  </label>
                </td>

                <td>
                  <ValidatorField value={userValue.newPassword} rules={myRules.newPassword}>
                    {({ isValid, message }: Validation) => (
                      <>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={userValue.newPassword}
                          onChange={inputOnChange}
                          className={inputClass(isValid, userValue.newPassword)}
                        />

                        {!isValid && validationMessageBlock(message)}
                      </>
                    )}
                  </ValidatorField>
                </td>
              </tr>

              <tr className={styles.inputBlock}>
                <td className={styles.inputTitle}>
                  <label htmlFor="repeatNewPassword">
                    Повторите пароль
                  </label>
                </td>

                <td>
                  <input
                    type="password"
                    id="repeatNewPassword"
                    name="repeatNewPassword"
                    value={userValue.repeatNewPassword}
                    onChange={inputOnChange}
                    className={repeatNewPassordClass()}
                  />

                  {
                    userValue.newPassword !== userValue.repeatNewPassword
                    && userValue.newPassword
                    && userValue.repeatNewPassword
                    && validationMessageBlock('Пароли не совпадают')
                  }
                </td>
              </tr>

              <tr className={cn(styles.inputBlock, styles.twoColumns)}>
                <td colSpan={2}>
                  <button
                    type="button"
                    onClick={handlePasswordSubmit}
                    className={styles.button}
                  >
                    Изменить пароль
                  </button>
                </td>
              </tr>
            </table>
          </ValidatorWrapper>

          <div className={styles.menuDataChange}>
            <div
              className={activeDataItemClass()}
              onClick={() => { setChangeDataClick(true); setChangePassordClick(false); }}
            >
              Личные данные
            </div>
            <div
              className={activePasswordItemClass()}
              onClick={() => { setChangeDataClick(false); setChangePassordClick(true); }}
            >
              Пароль
            </div>
          </div>
        </div>
      </MainPageWrapper>
    </div>
  );
}
