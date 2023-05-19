import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useActions } from '../../hooks/useAction';

import classes from './EditProfile.module.scss';

export function EditProfile() {
  const newPerson = useSelector((state) => state.accountReducer.personData);
  console.log(newPerson);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur', defaultValues: newPerson });

  const { fetchEditProfile } = useActions();

  const onSubmit = (data) => {
    // console.log(JSON.stringify(data
    fetchEditProfile(JSON.stringify(data), newPerson.token);
    reset();
  };

  return (
    <div className={classes['edit-profile']}>
      <h1 className={classes['edit-profile__title']}>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['edit-profile__list']}>
          <div className={classes['edit-profile__item']}>
            <h4 className={classes['edit-profile__head']}>Username</h4>
            <input
              type="text"
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Your name needs to be at least 3 characters.' },
                maxLength: { value: 20, message: 'Your name must not be longer than 20 characters' },
                pattern: {
                  value: /^[a-z0-9]*$/,
                  message: 'You can only use lowercase English letters and numbers',
                },
              })}
              placeholder="Username"
              className={classes['edit-profile__input-name']}
            />
            {errors.username ? (
              <div className={classes['edit-profile__error-elem']}>{errors.username.message}</div>
            ) : null}
          </div>
          <div className={classes['edit-profile__item']}>
            <h4 className={classes['edit-profile__head']}>Email address</h4>
            <input
              type="text"
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Your email must be a valid email address',
                },
              })}
              placeholder="Email address"
              className={classes['edit-profile__input-name']}
            />
            {errors['Email address'] ? (
              <div className={classes['edit-profile__error-elem']}>{errors['Email address'].message}</div>
            ) : null}
          </div>
          <div className={classes['edit-profile__item']}>
            <h4 className={classes['edit-profile__head']}>New Password</h4>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
                maxLength: { value: 40, message: 'Your password must not be longer than 40 characters' },
              })}
              placeholder="New Password"
              className={classes['edit-profile__input-name']}
            />
            {errors.password ? (
              <div className={classes['edit-profile__error-elem']}>{errors.password.message}</div>
            ) : null}
          </div>
          <div className={classes['edit-profile__item']}>
            <h4 className={classes['edit-profile__head']}>Avatar image (url)</h4>
            <input
              type="password"
              {...register('img', {
                required: 'Avatar image is required',
              })}
              placeholder="Avatar image"
              className={classes['edit-profile__input-name']}
            />
            {errors['Avatar image'] ? (
              <div className={classes['edit-profile__error-elem']}>
                {errors.img ? <div className={classes['edit-profile__error-elem']}>{errors.img.message}</div> : null}
              </div>
            ) : null}
          </div>
        </div>

        <input type="submit" className={classes['edit-profile__input-submit']} value="Save" />
      </form>
    </div>
  );
}
