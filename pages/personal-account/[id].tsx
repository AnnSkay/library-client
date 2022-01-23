import React, { useRef, useState, useEffect, RefObject } from 'react';
import Router, { useRouter } from 'next/router';
import api from '../../services/api';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ValidatorWrapper, { ValidatorField } from '@coxy/react-validator';
import myRules from '../../validation/rules';
import cn from 'classnames';
import { HeadBlock } from '../../components/ui/head-block';
import { MainHeaderWrapper } from '../../components/ui/main-header-wrapper';
import { MainLogo } from '../../components/ui/main-logo';
import { MainMenuUsers } from '../../components/ui/main-menu-users';
import { MainPageWrapper } from '../../components/ui/main-page-wrapper';
import styles from './styles.module.css';

export default function PersonalAccountPage(bytes: BufferSource): JSX.Element {
  interface ValidationType {
    isValid: boolean;
    message: string;
    errors: string;
  }

  interface UserDataType {
    id: number;
    name: string;
    lastname: string;
    login: string;
    password: string;
    role: string;
    phone: string;
  }

  const router = useRouter();
  const {id} = router.query;

  const validator = useRef() as RefObject<HTMLFormElement> | undefined;

  const [userData, setUserData] = useState<UserDataType>({
    id: 0,
    name: '',
    lastname: '',
    login: '',
    password: '',
    role: '',
    phone: ''
  });

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

  const [changeDataClick, setChangeDataClick] = useState(true);
  const [changePasswordClick, setChangePasswordClick] = useState(false);

  const [handleDataSubmitClick, isHandleDataSubmitClick] = useState(false);
  const [handlePasswordSubmitClick, isHandlePasswordSubmitClick] = useState(false);

  const inputOnChange = (event: { target: HTMLInputElement; }) => {
    setUserValue({
      ...userValue,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserData();
  }, [id]);

  const getUserData = async () => {
    await api
      .post('/users/user-data', {
        id
      })
      .then((response) => {
        if (response.data === 'no user') {
          Router.push(`/404.tsx`);
        }
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
  };

  const sendDataChange = async () => {
    await api
      .post('/users/change-user-data', {
        ...userValue
      })
      .then((response) => {
        setUserData(response.data);
        setUserValue({
          ...userValue,
          name: response.data.name,
          lastname: response.data.lastname,
          email: response.data.login,
          phone: response.data.phone
        });
      });
  };

  const sendPasswordChange = async () => {
    await api
      .post('/users/change-user-password', {
        ...userValue
      })
      .then((response) => {
        setUserData(response.data);
      });
  };

  const itemClick = (changeData: boolean, changePassword: boolean) => {
    setChangeDataClick(changeData);
    setChangePasswordClick(changePassword);
  };

  const validationMessageBlock = (validationMessage: string) =>
    <div className={styles.errorInput}>{validationMessage}</div>;

  const handleDataSubmit = () => {
    const {isValid, message}: ValidationType = validator?.current?.validate(bytes);

    isHandleDataSubmitClick(true);

    if (isValid
        || message === 'Пароль обязателен'
        || message === 'Пароль должен быть не меньше 6 символов'
    ) {
      sendDataChange();
      alert('Изменения прошли успешно');
    }
  };

  const handlePasswordSubmit = () => {
    isHandlePasswordSubmitClick(true);

    if (userValue.oldPassword === userData.password
        && userValue.repeatNewPassword === userValue.newPassword
        && userValue.repeatNewPassword
    ) {
      sendPasswordChange();
      alert('Изменения прошли успешно');
    }
  };

  const inputClass = (isValid: boolean, inputValue: string) => cn(styles.input, {
    [styles.redBorder]: !isValid && inputValue.length !== 0,
    [styles.greenBorder]: isValid
  });

  const repeatNewPasswordClass = () => cn(styles.input, {
    [styles.redBorder]: userValue.newPassword !== userValue.repeatNewPassword
                        && userValue.newPassword
                        && userValue.repeatNewPassword,
    [styles.greenBorder]: userValue.newPassword === userValue.repeatNewPassword
                          && userValue.repeatNewPassword
  });

  const changeDataTableClass = () => cn(styles.personalAccBlock, {
    [styles.noDisplay]: !changeDataClick
  });

  const changePasswordTableClass = () => cn(styles.personalAccBlock, {
    [styles.noDisplay]: !changePasswordClick
  });

  const activeDataItemClass = () => cn(styles.menuChangeItem, {
    [styles.activeItem]: changeDataClick
  });

  const activePasswordItemClass = () => cn(styles.menuChangeItem, {
    [styles.activeItem]: changePasswordClick
  });

  return (
    <div>
      <HeadBlock title="Personal account"/>

      <MainPageWrapper>
        <MainHeaderWrapper>
          <MainLogo link={`/main-users/${userData.id}`}/>
          <h1 className={styles.headerTitle}>
            Личный кабинет
          </h1>
          <MainMenuUsers user={userData} page="personalAccount"/>
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
                    {({isValid, message}: ValidationType) => (
                      <>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={userValue.email}
                          onChange={inputOnChange}
                          className={inputClass(isValid, userValue.email)}
                        />

                        {
                          !isValid
                          && handleDataSubmitClick
                          && validationMessageBlock(message)
                        }
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
                    {({isValid, message}: ValidationType) => (
                      <>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={userValue.phone}
                          onChange={inputOnChange}
                          className={inputClass(isValid, userValue.phone)}
                        />

                        {
                          !isValid
                          && handleDataSubmitClick
                          && validationMessageBlock(message)
                        }
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

            <table className={changePasswordTableClass()}>
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
                  <ValidatorField value={userValue.newPassword} rules={myRules.password}>
                    {({isValid, message}: ValidationType) => (
                      <>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={userValue.newPassword}
                          onChange={inputOnChange}
                          className={inputClass(isValid, userValue.newPassword)}
                        />

                        {
                          !isValid
                          && handlePasswordSubmitClick
                          && validationMessageBlock(message)
                        }
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
                    className={repeatNewPasswordClass()}
                  />

                  {
                    userValue.newPassword !== userValue.repeatNewPassword
                    && userValue.newPassword
                    && userValue.repeatNewPassword
                    && handlePasswordSubmitClick
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

          <div>
            <div
              className={activeDataItemClass()}
              onClick={() => itemClick(true, false)}
            >
              Личные данные
            </div>

            <div
              className={activePasswordItemClass()}
              onClick={() => itemClick(false, true)}>
              Пароль
            </div>
          </div>
        </div>
      </MainPageWrapper>
    </div>
  );
}
