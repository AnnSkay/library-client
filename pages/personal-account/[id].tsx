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

export default function PersonalAccountPage(): JSX.Element {
  const router = useRouter();

  const [userData, setUserData] = useState({});

  const [userId, handleChangeUserId] = useState('');
  const [name, handleChangeName] = useState('');
  const [lastname, handleChangeLastname] = useState('');
  const [email, handleChangeEmail] = useState('');
  const [phone, handleChangePhone] = useState('');
  const [oldPassword, handleChangeOldPassword] = useState('');
  const [newPassword, handleChangeNewPassword] = useState('');
  const [repeatNewPassword, handleChangeRepeatNewPassword] = useState('');

  const [changeDataClick, setChangeDataClick] = useState(true);
  const [changePassordClick, setChangePassordClick] = useState(false);

  const getUserName = async (id: string) => {
    await axios
    .post('http://localhost:3001/api/user', {
      id
    }).then(response => {
      setUserData(response.data);
      handleChangeUserId(response.data.id);
      handleChangeName(response.data.name);
      handleChangeLastname(response.data.lastname);
      handleChangeEmail(response.data.login);
      handleChangePhone(response.data.phone);
    });
  }  

  const sendDataChange = async () => {
    await axios
    .post('http://localhost:3001/api/changeUserData', {
      userId,
      name,
      lastname,
      email,
      phone
    }).then(response => {
      setUserData(response.data);
      handleChangeName(response.data.name);
      handleChangeLastname(response.data.lastname);
      handleChangeEmail(response.data.login);
      handleChangePhone(response.data.phone);
    });
  }  

  const sendPasswordChange = async () => {
    await axios
    .post('http://localhost:3001/api/changeUserPassword', {
      userId,
      newPassword
    }).then(response => {
      setUserData(response.data);
    });
  }  

  useEffect(() => {
    const { id } = router.query;;
    console.log(id);  
    getUserName(id);
  }, [router]);

  const validator = useRef<any>();

  interface Validation {
    isValid: boolean;
    message: string;
    errors: string;
  }

  const inputClass = (isValid: boolean, inputValue: string) => cn(styles.input, {
    [styles.redBorder]: !isValid && inputValue.length !== 0,
    [styles.greenBorder]: isValid,
  });

  const repeatNewPassordClass = () => cn(styles.input, {
    [styles.redBorder]: newPassword !== repeatNewPassword && newPassword && repeatNewPassword,
    [styles.greenBorder]: newPassword === repeatNewPassword && repeatNewPassword,
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
    const { isValid, message, errors }: Validation = validator.current.validate();
    
    if (!isValid && message !== 'Пароль обязателен' && message !== 'Пароль должен быть не меньше 6 символов') {
      console.log(isValid, message, errors);
    } else {
      sendDataChange();
      alert('Изменения прошли успешно');
    }
  };  

  const handlePasswordSubmit = () => {
    const { isValid, message, errors }: Validation = validator.current.validate();
    
    if (oldPassword !== userData.password || repeatNewPassword !== newPassword || repeatNewPassword === '') {
      console.log(isValid, message, errors);
    } else {
      sendPasswordChange();
      alert('Изменения прошли успешно');
    }
  }; 

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
                          className={inputClass(isValid, phone)}
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
                    value={oldPassword}
                    onChange={(e) => handleChangeOldPassword(e.target.value)}
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
                  <ValidatorField value={newPassword} rules={myRules.newPassword}>
                    {({ isValid, message }: Validation) => (
                      <>
                        <input
                          type="password"
                          id="newPassword"
                          value={newPassword}
                          onChange={({ target: { value } }) => handleChangeNewPassword(value)}
                          className={inputClass(isValid, newPassword)}
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
                    value={repeatNewPassword}
                    onChange={(e) => handleChangeRepeatNewPassword(e.target.value)}
                    className={repeatNewPassordClass()}
                  />

                  {
                    newPassword !== repeatNewPassword && newPassword && repeatNewPassword &&
                    validationMessageBlock('Пароли не совпадают')
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
              <div className={activeDataItemClass()} onClick={() => {setChangeDataClick(true); setChangePassordClick(false);}}>
                Личные данные
              </div>
              <div className={activePasswordItemClass()} onClick={() => {setChangeDataClick(false); setChangePassordClick(true);}}>
                Пароль
              </div>
          </div>
        </div>  
      </MainPageWrapper>
    </div>
  );
}
