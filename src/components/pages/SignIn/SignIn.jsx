import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useActions } from '../../../hooks/useAction';
import { itemCreator, emailRegister, passwordRegister } from '../../../helpers/createInputsItem';

import classes from './SignIn.module.scss';

export function SignIn() {
   const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({ mode: 'onBlur' });
   const { fetchLogin } = useActions();

   const [error, setError] = useState('');
   const errorContainer = useRef();
   const navigate = useNavigate();

   const onSubmit = (data) => {
      const user = JSON.stringify({ user: { ...data } });
      fetchLogin(user).then((result) => {
         if (result.payload.errors) {
            const err = result.payload.errors;
            setError(`${Object.keys(err)[0]} ${Object.values(err)[0]}`);
         } else return navigate('/');
         reset();
      });
   };

   if (error && errorContainer.current)
      errorContainer.current.classList.remove(`${classes['sign-in__error-container--hidden']}`);

   const onClick = () => {
      errorContainer.current.classList.add(`${classes['sign-in__error-container--hidden']}`);
      setError(false);
   };

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
                  noChanged: true,
               })}
               {itemCreator({
                  headText: 'Password',
                  register: register('password', passwordRegister.password),
                  errorsKey: 'password',
                  errors,
                  classN: 'sign-in',
                  noChanged: true,
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
            Error - {error}
         </div>
      </div>
   );
}
