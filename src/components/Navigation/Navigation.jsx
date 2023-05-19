import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';

import { useActions } from '../../hooks/useAction';
// import { fetchGetLoginPerson, signUpPerson } from '../../store/slices/accountSlice';

import classes from './Navigation.module.scss';

export function Navigation() {
  const setActive = ({ isActive }) => (isActive ? classes['nav__active-item'] : '');
  const newPerson = useSelector((state) => state.accountReducer.personData);
  const token = localStorage.getItem('token');
  console.log(token);

  const { clearState } = useActions();

  const onLogOutClick = () => {
    clearState();
  };

  // useEffect(() => {
  //   if (newPerson.token) fetchGetLoginPerson(newPerson.token);
  // }, [newPerson.token]);

  const authorizationList = (
    <>
      <Link to={'sign-in'} className={classes['nav__create-article']}>
        Create article
      </Link>
      <Link to={'profile'}>{newPerson.username}</Link>

      <Link to={'sign-in'} className={classes.nav__item} onClick={onLogOutClick}>
        Log Out
      </Link>
    </>
  );

  const defaultList = (
    <>
      <NavLink to={'sign-in'} className={setActive}>
        Sign In
      </NavLink>
      <NavLink to={'sign-up'} className={setActive}>
        Sign Up
      </NavLink>
    </>
  );

  const content = token ? authorizationList : defaultList;
  return (
    <nav className={classes.nav}>
      <div>Realworld Blog</div>
      <div className={classes.nav__authorization}>{content}</div>
    </nav>
  );
}
