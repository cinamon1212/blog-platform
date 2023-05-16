import classes from './Navigation.module.scss';

export function Navigation() {
  return (
    <nav className={classes.nav}>
      <div>Realworld Blog</div>
      <div className={classes.nav__authorization}>
        <span>Sign In</span>
        <span className={classes['nav__active-item']}>Sign Un</span>
      </div>
    </nav>
  );
}
