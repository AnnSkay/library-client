// eslint-disable-next-line
const emailReg = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
const phoneReg = /^((\+7|7|8)+([0-9]){10})$/;

export default {
  email: [
    {
      rule: (value: string) => !!value && value !== '' && value.length !== 0,
      message: 'Email обязателен'
    }, {
      rule: (value: string) => emailReg.test(value),
      message: 'Формат email некорректный'
    }
  ],

  password: [
    {
      rule: (value: string) => value.length > 0,
      message: 'Пароль обязателен'
    }, {
      rule: (value: string) => value.length > 5,
      message: 'Пароль должен быть не меньше 6 символов'
    }
  ],

  phone: [
    {
      rule: (value: string) => value !== '' && value.length > 0,
      message: 'Телефон обязателен'
    }, {
      rule: (value: string) => phoneReg.test(value),
      message: 'Формат телефона некорректный'
    }
  ]
};
