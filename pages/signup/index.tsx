import Link from 'next/link';
import React, { useRef, useState } from 'react';
// @ts-ignore
import ValidatorWrapper, { ValidatorField } from '@coxy/react-validator';
import cn from 'classnames';
import styles from './styles.module.css';
import { AuthMainWrapper } from '../../components/ui/auth-main-wrapper';
import { AuthTitle } from '../../components/ui/auth-title';
import { AuthLogo } from '../../components/ui/auth-logo';
import { AuthDescription } from '../../components/ui/auth-description';
import { AuthLeftWrapper } from '../../components/ui/auth-left-wrapper';
import { HeadBlock } from '../../components/ui/head-block';

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

export default function SignInPage(bytes: BufferSource): JSX.Element {
  const [email, handleChangeEmail] = useState('');
  const [phone, handleChangePhone] = useState('');
  const [password, handleChangePassword] = useState('');
  const [repeatPass, handleChangeRepeatPass] = useState('');

  const validator = useRef<any>();

  interface Validation {
    isValid: boolean;
    message: string;
    errors: string;
  }

  const handleSubmit = () => {
    const { isValid, message, errors }: Validation = validator.current.validate(bytes);
    if (!isValid) {
      console.log(isValid, message, errors);
    }
    // Success
  };

  const inputClass = (isValid: boolean, inputValue: string) => cn(styles.input, {
    [styles.redBorder]: !isValid && inputValue.length !== 0,
    [styles.greenBorder]: isValid,
  });

  const repeatPassClass = () => cn(styles.input, {
    [styles.redBorder]: password !== repeatPass && password && repeatPass,
    [styles.greenBorder]: password === repeatPass && repeatPass,
  });

  const validationMessageBlock = (validationMessage: string) =>
    <div className={styles.errorInput}>{validationMessage}</div>

  return (
    <div className={styles.container}>

      <HeadBlock title="Sign up"/>

      <AuthMainWrapper>
        <AuthLeftWrapper>
          <AuthLogo />

          <div className={styles.registration}>
            <AuthTitle title="Регистрация" />

            <ValidatorWrapper ref={validator}>

              <div className={styles.blockInput}>
                <input
                  type="text"
                  className={cn(styles.input, styles.inputPartOne)}
                  placeholder="Имя"
                />

                <input
                  type="text"
                  className={cn(styles.input, styles.inputPartTwo)}
                  placeholder="Фамилия"
                />
              </div>

              <ValidatorField value={email} rules={myRules.email}>
                {({ isValid, message }: Validation) => (
                  <>
                    <input
                      type="text"
                      value={email}
                      onChange={({ target: { value } }) => handleChangeEmail(value)}
                      className={inputClass(isValid, email)}
                      placeholder="E-mail"
                    />

                    {!isValid && validationMessageBlock(message)}
                  </>
                )}
              </ValidatorField>

              <ValidatorField value={phone} rules={myRules.phone}>
                {({ isValid, message }: Validation) => (
                  <>
                    <input
                      type="text"
                      value={phone}
                      onChange={({ target: { value } }) => handleChangePhone(value)}
                      className={inputClass(isValid, phone)}
                      placeholder="Телефон"
                    />

                    {!isValid && validationMessageBlock(message)}
                  </>
                )}
              </ValidatorField>

              <ValidatorField value={password} rules={myRules.password}>
                {({ isValid, message }: Validation) => (
                  <>
                    <input
                      type="password"
                      value={password}
                      onChange={({ target: { value } }) => handleChangePassword(value)}
                      className={inputClass(isValid, password)}
                      placeholder="Пароль"
                    />

                    {!isValid && validationMessageBlock(message)}
                  </>
                )}
              </ValidatorField>

              <input
                type="password"
                value={repeatPass}
                onChange={({ target: { value } }) => handleChangeRepeatPass(value)}
                className={repeatPassClass()}
                placeholder="Повторите пароль"
              />

              {
                password !== repeatPass && password && repeatPass &&
                validationMessageBlock('Пароли не совпадают')
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
                <a className={styles.loginLink}>Войти</a>
              </Link>
            </div>
          </div>
        </AuthLeftWrapper>

        <AuthDescription />
      </AuthMainWrapper>

    </div>
  );
}
