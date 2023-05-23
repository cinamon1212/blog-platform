import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import { useRef } from 'react';

import { useActions } from '../../../hooks/useAction';
import { itemCreator, usernameRegister, emailRegister, passwordRegister } from '../../../helpers/createInputsItem';

import classes from './SignUp.module.scss';

export function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ mode: 'onSubmit' });

  const errorContainer = useRef();
  const { fetchRegister, clearErrors } = useActions();

  const error = useSelector((state) => state.accountReducer.errors);
  const user = useSelector((state) => state.accountReducer.personData);

  if (error && Object.keys(error).length && errorContainer.current)
    errorContainer.current.classList.remove(`${classes['sign-up__error-container--hidden']}`);
  else if (errorContainer.current)
    errorContainer.current.classList.add(`${classes['sign-up__error-container--hidden']}`);

  const onSubmit = (data) => {
    const resData = JSON.stringify({ user: { username: data.username, email: data.email, password: data.password } });
    console.log(resData);
    fetchRegister(resData);
    reset();
  };

  const onClick = () => {
    errorContainer.current.classList.add(`${classes['sign-up__error-container--hidden']}`);
    clearErrors();
  };

  if (user && Object.keys(user).length) return <Navigate replace to={'/'} />;
  else
    return (
      <div className={classes['sign-up']}>
        <h1 className={classes['sign-up__title']}>Create new account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes['sign-up__list']}>
            {itemCreator(
              'Username',
              register(Object.keys(usernameRegister)[0], usernameRegister.username),
              'username',
              errors,
              'sign-up',
            )}
            {itemCreator(
              'Email address',
              register(Object.keys(emailRegister)[0], emailRegister.email),
              'email',
              errors,
              'sign-up',
            )}
            {itemCreator(
              'Password',
              register(Object.keys(passwordRegister)[0], passwordRegister.password),
              'password',
              errors,
              'sign-up',
            )}
            <div className={classes['sign-up__item']}>
              <h4 className={classes['sign-up__head']}>Repeat Password</h4>
              <input
                type="password"
                {...register('Repeat Password', {
                  required: 'Repeat Password is required',
                  validate: (text) => {
                    const passwordValue = getValues('password');
                    if (text === passwordValue) return true;
                    else return false;
                  },
                })}
                placeholder="Password"
                className={classes['sign-up__input-name']}
              />
              {errors['Repeat Password'] ? (
                <div className={classes['sign-up__error-elem']}>
                  {errors['Repeat Password'].type === 'required'
                    ? errors['Repeat Password'].message
                    : 'Passwords must match'}
                </div>
              ) : null}
            </div>
          </div>
          <div className={classes['sign-up__divider']} />
          <label className={classes['sign-up__label']}>
            <input
              type="checkbox"
              {...register('check', {
                required: 'Сonsent is required',
              })}
            />
            <span className={classes['sign-up__agreed']}>I agree to the processing of my personal information</span>
          </label>
          {errors.check ? <div className={classes['sign-up__error-elem']}>{errors.check.message}</div> : null}
          <input type="submit" className={classes['sign-up__input-submit']} value="Create" />
        </form>
        <div className={classes['sign-up__link-container']}>
          <span>
            Already have an account?{' '}
            <NavLink to={'/sign-in'} className={classes['sign-up__Link']}>
              Sign In
            </NavLink>
          </span>
        </div>
        <div
          className={`${classes['sign-up__error-container']} ${classes['sign-up__error-container--hidden']}`}
          ref={errorContainer}
        >
          <button className={classes['sign-up__error-button']} onClick={onClick}>
            ✖
          </button>
          Something went wrong... Try to sign up again
        </div>
      </div>
    );
}