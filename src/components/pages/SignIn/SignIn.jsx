import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { NavLink, Navigate } from 'react-router-dom';

import { useActions } from '../../../hooks/useAction';
import { itemCreator, emailRegister, passwordRegister } from '../../../helpers/createInputsItem';

import classes from './SignIn.module.scss';

export function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onSubmit' });
  const { fetchLogin, clearErrors } = useActions();

  const errorContainer = useRef();

  const error = useSelector((state) => state.accountReducer.errors);
  const user = useSelector((state) => state.accountReducer.personData);

  const onSubmit = (data) => {
    const user = JSON.stringify({ user: { ...data } });
    fetchLogin(user);
    reset();
  };

  if (error && Object.keys(error).length && errorContainer.current)
    errorContainer.current.classList.remove(`${classes['sign-in__error-container--hidden']}`);

  const onClick = () => {
    errorContainer.current.classList.add(`${classes['sign-in__error-container--hidden']}`);
    clearErrors();
  };

  if (user && Object.keys(user).length) return <Navigate replace to={'/'} />;

  return (
    <div className={classes['sign-in']}>
      <h1 className={classes['sign-in__title']}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['sign-in__list']}>
          {itemCreator({
            headText: 'Email address',
            register: register('email', emailRegister.email),
            errorsKey: 'email',
            errors,
            classN: 'sign-in',
          })}
          {itemCreator({
            headText: 'Password',
            register: register('password', passwordRegister.password),
            errorsKey: 'password',
            errors,
            classN: 'sign-in',
          })}
        </div>

        <input type="submit" className={classes['sign-in__input-submit']} value="Login" />
      </form>
      <div className={classes['sign-in__link-container']}>
        <span>
          Don’t have an account?{' '}
          <NavLink to={'/sign-up'} className={classes['sign-in__Link']}>
            Sign Up
          </NavLink>
        </span>
      </div>
      <div
        className={`${classes['sign-in__error-container']} ${classes['sign-in__error-container--hidden']}`}
        ref={errorContainer}
      >
        <button className={classes['sign-in__error-button']} onClick={onClick}>
          ✖
        </button>
        Something went wrong... Try to login again
      </div>
    </div>
  );
}
