import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

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
   const [error, setError] = useState('');
   const errorContainer = useRef();
   const { clearErrors, fetchEditProfile } = useActions();
   const navigate = useNavigate();
   const newPerson = useSelector((state) => state.accountReducer.personData);
   // const error = useSelector((state) => state.accountReducer.errors);
   const token = localStorage.getItem('token');

   const defaultForm = newPerson.user ? (Object.keys(newPerson.user).length ? newPerson.user : {}) : {};

   const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({
      mode: 'onBlur',
      defaultValues: defaultForm,
   });

   if (error && errorContainer.current)
      errorContainer.current.classList.remove(`${classes['edit-profile__error-container--hidden']}`);

   const onClick = () => {
      errorContainer.current.classList.add(`${classes['edit-profile__error-container--hidden']}`);
      clearErrors();
   };

   const onSubmit = (data) => {
      const user = { user: { ...data, token } };
      fetchEditProfile(user).then((result) => {
         if (result.payload.errors) {
            const err = result.payload.errors;
            setError(`${Object.keys(err)[0]} ${Object.values(err)[0]}`);
         } else return navigate('/');
         reset();
      });
   };

   return (
      <div className={classes['edit-profile']}>
         <h1 className={classes['edit-profile__title']}>Edit Profile</h1>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes['edit-profile__list']}>
               {itemCreator({
                  headText: 'Username',
                  register: register('username', usernameRegister.username),
                  errorsKey: 'username',
                  errors,
                  classN: 'edit-profile',
                  noChanged: true,
               })}
               {itemCreator({
                  headText: 'Email address',
                  register: register('email', emailRegister.email),
                  errorsKey: 'email',
                  errors,
                  classN: 'edit-profile',
                  noChanged: true,
               })}
               {itemCreator({
                  headText: 'New Password',
                  register: register('password', passwordRegister.password),
                  errorsKey: 'password',
                  errors,
                  classN: 'edit-profile',
                  noChanged: true,
               })}
               {itemCreator({
                  headText: 'Avatar image (url)',
                  register: register('image', avatarRegister.image),
                  errorsKey: 'image',
                  errors,
                  classN: 'edit-profile',
                  noChanged: true,
               })}
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
