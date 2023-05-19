import { Outlet } from 'react-router-dom';

import { Navigation } from '../Navigation/Navigation';

import classes from './Layout.module.scss';

export function Layout() {
  return (
    <>
      <Navigation />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
}
