import { Routes, Route } from 'react-router-dom';
// import { Navigation } from '../Navigation/Navigation';
import { Pagination } from 'antd';

import { List } from '../List/List';
import { ItemList } from '../ItemList/ItemList';
import { Layout } from '../Layout/Layout';
// import { Authorization } from '../Authorization/Authorization';

import './App.module.scss';

export function App() {
  return (
    <>
      {/* <Navigation />
      <main className={classes.main}> */}
      <Routes>
        <Route path="/articles?" element={<Layout />}>
          <Route index element={<List />} />
          <Route index element={<Pagination defaultCurrent={1} total={50} />} />
          <Route path={'articles/:id'} element={<ItemList />} />
        </Route>
      </Routes>

      {/* <Authorization /> */}
      {/* </main> */}
    </>
  );
}
