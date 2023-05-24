import { useActions } from '../hooks/useAction';

import classes from './helpers.module.scss';

export const itemCreator = ({
  headText,
  register,
  errorsKey,
  errors,
  classN,
  placeholder,
  textareaClassN,
  // defaultValue,
  noChanged,
  value,
}) => {
  const { inputValueChange } = useActions();

  const onInputChange = (e, name) => {
    inputValueChange({ name, inputValue: e.target.value });
  };

  const textarea = textareaClassN ? (
    <textarea
      type={'text'}
      className={classes[`${textareaClassN}`]}
      placeholder={placeholder ? placeholder : headText}
      {...register}
      // defaultValue={defaultValue ? defaultValue : ''}
      value={value}
      onChange={noChanged ? () => {} : (e) => onInputChange(e, errorsKey)}
    ></textarea>
  ) : null;

  return (
    <div className={classes[`${classN}__item`]}>
      <h4 className={classes[`${classN}__head`]}>{headText}</h4>
      {textarea ? (
        textarea
      ) : (
        <input
          type={headText.includes('Password') ? 'password' : 'text'}
          {...register}
          placeholder={placeholder ? placeholder : headText}
          className={classes[`${classN}__input-name`]}
          // defaultValue={defaultValue ? defaultValue : ''}
          value={value}
          onChange={noChanged ? () => {} : (e) => onInputChange(e, errorsKey)}
        />
      )}

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

export const titleRegister = {
  title: {
    required: 'Title is required',
  },
};

export const descriptionRegister = {
  description: {
    required: 'Description is required',
  },
};

export const textRegister = {
  body: {
    required: 'Text is required field',
    setValueAs: (v) => v.trim(),
    minLength: {
      value: 10,
      message: 'Text field must have min 10 characters',
    },
  },
};
