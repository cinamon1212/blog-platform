import { Routes, Route } from 'react-router-dom';
// import { Navigation } from '../Navigation/Navigation';

import { List } from '../List/List';
import { ItemList } from '../ItemList/ItemList';
import { Layout } from '../Layout/Layout';
import { SignUp } from '../SignUp/SignUp';
import { SignIn } from '../SignIn/SignIn';
import { EditProfile } from '../EditProfile/EditProfile';

import './App.module.scss';

export function App() {
  return (
    <>
      {/* <Navigation />
      <main className={classes.main}> */}
      <Routes>
        <Route path="/articles?" element={<Layout />}>
          <Route index element={<List />} />
          <Route path={'articles/:id'} element={<ItemList />} />
          <Route path={'sign-up'} element={<SignUp />}></Route>
          <Route path={'sign-in'} element={<SignIn />} />
          <Route path={'profile'} element={<EditProfile />} />
        </Route>
      </Routes>

      {/* <sign-up /> */}
      {/* </main> */}
    </>
  );
}
