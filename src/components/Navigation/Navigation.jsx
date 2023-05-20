import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { useActions } from '../../hooks/useAction';

import classes from './Navigation.module.scss';

export function Navigation() {
  const setActive = ({ isActive }) => (isActive ? classes['nav__active-item'] : '');
  const newPerson = useSelector((state) => state.accountReducer.personData);
  console.log(newPerson);
  const token = localStorage.getItem('token');

  const { clearState, fetchGetLoginPerson } = useActions();

  const onLogOutClick = () => {
    clearState();
  };

  useEffect(() => {
    if (token) fetchGetLoginPerson(token);
  }, [token]);

  const authorizationList = (
    <>
      <Link to={'sign-in'} className={classes['nav__create-article']}>
        Create article
      </Link>
      <Link to={'profile'}>{newPerson?.user?.username}</Link>
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
      <div>Realworld Blog</div>
      <div className={classes.nav__authorization}>{content}</div>
    </nav>
  );
}
