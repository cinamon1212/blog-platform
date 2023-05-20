import classes from './helpers.module.scss';

export const itemCreator = (headText, register, errorsKey, errors, classN) => {
  return (
    <div className={classes[`${classN}__item`]}>
      <h4 className={classes[`${classN}__head`]}>{headText}</h4>
      <input
        type={headText.includes('Password') ? 'password' : 'text'}
        {...register}
        placeholder={headText}
        className={classes[`${classN}__input-name`]}
      />
      {errors[`${errorsKey}`] ? (
        <div className={classes[`${classN}__error-elem`]}>{errors[`${errorsKey}`].message}</div>
      ) : null}
    </div>
  );
};

export const usernameRegister = {
  username: {
    required: 'Username is required',
    minLength: { value: 3, message: 'Your name needs to be at least 3 characters.' },
    maxLength: { value: 20, message: 'Your name must not be longer than 20 characters' },
    pattern: {
      value: /^[a-z0-9]*$/,
      message: 'You can only use lowercase English letters and numbers',
    },
  },
};

export const emailRegister = {
  email: {
    required: 'Email address is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Your email must be a valid email address',
    },
  },
};

export const passwordRegister = {
  password: {
    required: 'Password is required',
    minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
    maxLength: { value: 40, message: 'Your password must not be longer than 40 characters' },
  },
};

export const avatarRegister = {
  image: {
    required: false,
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: 'Your avatar must be a valid image address',
    },
  },
};
