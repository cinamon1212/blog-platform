import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { useActions } from '../../hooks/useAction';

import classes from './Navigation.module.scss';

export function Navigation() {
  const setActive = ({ isActive }) => (isActive ? classes['nav__active-item'] : '');
  const newPerson = useSelector((state) => state.accountReducer.personData);
  const token = localStorage.getItem('token');

  const { clearState, fetchGetLoginPerson, clearOpenedItem } = useActions();

  const onLogOutClick = () => {
    clearState();
  };

  useEffect(() => {
    if (token) fetchGetLoginPerson(token);
  }, [token]);

  const onCreateClick = () => {
    clearOpenedItem();
  };

  const authorizationList = (
    <>
      <Link to={'new-article'} className={classes['nav__create-article']} onClick={onCreateClick}>
        Create article
      </Link>
      <Link to={'profile'} className={classes.nav__item}>
        {newPerson?.user?.username}
      </Link>
      {newPerson?.user?.image ? (
        <Link to={'profile'}>
          {' '}
          <img src={newPerson?.user?.image} alt="profile" className={classes['nav__img-profile']} />
        </Link>
      ) : null}

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

  const content = newPerson?.user && Object.keys(newPerson.user).length ? authorizationList : defaultList;
  return (
    <nav className={classes.nav}>
      <Link to={'/'} className={classes.nav__item}>
        Realworld Blog
      </Link>
      <div className={classes.nav__authorization}>{content}</div>
    </nav>
  );
}
