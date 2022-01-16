import Link from 'next/link';
import React, { useRef, RefObject, useState } from 'react';
import api from '../../services/api';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ValidatorWrapper, { ValidatorField } from '@coxy/react-validator';
import myRules from '../../validation/rules';
import cn from 'classnames';
import styles from './styles.module.css';
import { AuthMainWrapper } from '../../components/ui/auth-main-wrapper';
import { AuthTitle } from '../../components/ui/auth-title';
import { AuthLogo } from '../../components/ui/auth-logo';
import { AuthDescription } from '../../components/ui/auth-description';
import { AuthLeftWrapper } from '../../components/ui/auth-left-wrapper';
import { HeadBlock } from '../../components/ui/head-block';

export default function SignInPage(bytes: BufferSource): JSX.Element {
  interface ValidationType {
    isValid: boolean;
    message: string;
    errors: string;
  }

  const validator = useRef() as RefObject<HTMLFormElement> | undefined;

  const [handleSubmitClick, isHandleSubmitClick] = useState(false);

  const [userValue, setUserValue] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    repeatPass: ''
  });

  const inputOnChange = (event: { target: HTMLInputElement; }) => {
    setUserValue({
      ...userValue,
      [event.target.name]: event.target.value
    });
  };

  const addUser = async () => {
    await api
      .post('/users/add-user', {
        ...userValue
      })
      .then((response) => {
        alert(response.data);
      });
  };

  const validationMessageBlock = (validationMessage: string) =>
    <div className={styles.errorInput}>{validationMessage}</div>;

  const handleSubmit = () => {
    const {isValid}: ValidationType = validator?.current?.validate(bytes);

    isHandleSubmitClick(true);

    if (isValid && userValue.repeatPass === userValue.password && userValue.repeatPass) {
      addUser();
    }
  };

  const inputClass = (isValid: boolean, inputValue: string) => cn(styles.input, {
    [styles.redBorder]: !isValid && inputValue.length !== 0,
    [styles.greenBorder]: isValid
  });

  const repeatPassClass = () => cn(styles.input, {
    [styles.redBorder]: userValue.password !== userValue.repeatPass
                        && userValue.password
                        && userValue.repeatPass,
    [styles.greenBorder]: userValue.password === userValue.repeatPass
                          && userValue.repeatPass
  });

  return (
    <div className={styles.container}>
      <HeadBlock title="Sign up"/>

      <AuthMainWrapper>
        <AuthLeftWrapper>
          <AuthLogo/>

          <div className={styles.registration}>
            <AuthTitle title="Регистрация"/>

            <ValidatorWrapper ref={validator}>

              <div className={styles.blockInput}>
                <input
                  type="text"
                  name="name"
                  value={userValue.name}
                  onChange={inputOnChange}
                  className={cn(styles.input, styles.inputPartOne)}
                  placeholder="Имя"
                />

                <input
                  type="text"
                  name="lastname"
                  value={userValue.lastname}
                  onChange={inputOnChange}
                  className={cn(styles.input, styles.inputPartTwo)}
                  placeholder="Фамилия"
                />
              </div>

              <ValidatorField value={userValue.email} rules={myRules.email}>
                {({
                    isValid,
                    message
                  }: ValidationType) => (
                  <>
                    <input
                      type="text"
                      name="email"
                      value={userValue.email}
                      onChange={inputOnChange}
                      className={inputClass(isValid, userValue.email)}
                      placeholder="E-mail"
                    />

                    {!isValid && handleSubmitClick && validationMessageBlock(message)}
                  </>
                )}
              </ValidatorField>

              <ValidatorField value={userValue.phone} rules={myRules.phone}>
                {({
                    isValid,
                    message
                  }: ValidationType) => (
                  <>
                    <input
                      type="text"
                      name="phone"
                      value={userValue.phone}
                      onChange={inputOnChange}
                      className={inputClass(isValid, userValue.phone)}
                      placeholder="Телефон"
                    />

                    {!isValid && handleSubmitClick && validationMessageBlock(message)}
                  </>
                )}
              </ValidatorField>

              <ValidatorField value={userValue.password} rules={myRules.password}>
                {({
                    isValid,
                    message
                  }: ValidationType) => (
                  <>
                    <input
                      type="password"
                      name="password"
                      value={userValue.password}
                      onChange={inputOnChange}
                      className={inputClass(isValid, userValue.password)}
                      placeholder="Пароль"
                    />

                    {!isValid && handleSubmitClick && validationMessageBlock(message)}
                  </>
                )}
              </ValidatorField>

              <input
                type="password"
                name="repeatPass"
                value={userValue.repeatPass}
                onChange={inputOnChange}
                className={repeatPassClass()}
                placeholder="Повторите пароль"
              />

              {
                userValue.password !== userValue.repeatPass
                && userValue.password
                && userValue.repeatPass
                && handleSubmitClick
                && validationMessageBlock('Пароли не совпадают')
              }

              <button
                type="button"
                onClick={handleSubmit}
                className={styles.button}
              >
                Зарегистрироваться
              </button>

            </ValidatorWrapper>

            <div className={styles.linkToAuth}>
              Уже участник?
              {' '}
              <Link href="../login">
                <a className={styles.loginLink}>
                  Войти
                </a>
              </Link>
            </div>
          </div>
        </AuthLeftWrapper>

        <AuthDescription/>
      </AuthMainWrapper>

    </div>
  );
}
