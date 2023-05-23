import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import {
  itemCreator,
  usernameRegister,
  emailRegister,
  passwordRegister,
  avatarRegister,
} from '../../../helpers/createInputsItem';
import { useActions } from '../../../hooks/useAction';

import classes from './EditProfile.module.scss';

export function EditProfile() {
  const errorContainer = useRef();
  const { clearErrors } = useActions();
  const newPerson = useSelector((state) => state.accountReducer.personData);
  const error = useSelector((state) => state.accountReducer.errors);
  const token = localStorage.getItem('token');
  const defaultForm = newPerson.user ? (Object.keys(newPerson.user).length ? newPerson.user : {}) : {};

  if (error && Object.keys(error).length && errorContainer.current)
    errorContainer.current.classList.remove(`${classes['edit-profile__error-container--hidden']}`);

  const onClick = () => {
    errorContainer.current.classList.add(`${classes['edit-profile__error-container--hidden']}`);
    clearErrors();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: defaultForm,
  });

  const { fetchEditProfile } = useActions();

  const onSubmit = (data) => {
    const user = { user: { ...data, token } };
    console.log(user);
    fetchEditProfile(user);
    reset();
    if (error && !Object.keys(error).length) return navigate('/');
  };

  let navigate = useNavigate();

  return (
    <div className={classes['edit-profile']}>
      <h1 className={classes['edit-profile__title']}>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['edit-profile__list']}>
          {itemCreator(
            'Username',
            register(Object.keys(usernameRegister)[0], usernameRegister.username),
            'username',
            errors,
            'edit-profile',
          )}
          {itemCreator(
            'Email address',
            register(Object.keys(emailRegister)[0], emailRegister.email),
            'email',
            errors,
            'edit-profile',
          )}
          {itemCreator(
            'New Password',
            register(Object.keys(passwordRegister)[0], passwordRegister.password),
            'password',
            errors,
            'edit-profile',
          )}
          {itemCreator(
            'Avatar image (url)',
            register(Object.keys(avatarRegister)[0], avatarRegister.image),
            'image',
            errors,
            'edit-profile',
          )}
        </div>

        <input type="submit" className={classes['edit-profile__input-submit']} value="Save" />
      </form>
      <div
        className={`${classes['edit-profile__error-container']} ${classes['edit-profile__error-container--hidden']}`}
        ref={errorContainer}
      >
        <button className={classes['edit-profile__error-button']} onClick={onClick}>
          ✖
        </button>
        Something went wrong... Try to edit profile again
      </div>
    </div>
  );
}
