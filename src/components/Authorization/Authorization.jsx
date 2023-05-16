import classes from './Authorization.module.scss';

export function Authorization() {
  return (
    <div className={classes.authorization}>
      <h1 className={classes.authorization__title}>Create new account</h1>
      <ul className={classes.authorization__list}>
        <li className={classes.authorization__item}>
          <h4 className={classes.authorization__head}>Username</h4>
          <input type="text" name="username" placeholder="Username" className={classes['authorization__input-name']} />
        </li>
        <li className={classes.authorization__item}>
          <h4 className={classes.authorization__head}>Username</h4>
          <input type="text" name="username" placeholder="Username" className={classes['authorization__input-name']} />
        </li>
        <li className={classes.authorization__item}>
          <h4 className={classes.authorization__head}>Username</h4>
          <input type="text" name="username" placeholder="Username" className={classes['authorization__input-name']} />
        </li>
        <li className={classes.authorization__item}>
          <h4 className={classes.authorization__head}>Username</h4>
          <input type="text" name="username" placeholder="Username" className={classes['authorization__input-name']} />
        </li>
      </ul>
      <div className={classes.authorization__divider} />
    </div>
  );
}
