import { Outlet } from 'react-router-dom';
// import { Pagination } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';

// import { fetchArticles } from '../../store/articleSlice';
import { Navigation } from '../Navigation/Navigation';

import classes from './Layout.module.scss';

export function Layout() {
  // const total = useSelector((state) => state.articles.articlesCount);
  // const page = useSelector((state) => state.articles.page);
  // const dispatch = useDispatch();

  // const onChange = (e) => {
  //   dispatch(fetchArticles(e));
  // };

  return (
    <>
      <Navigation />
      <main className={classes.main}>
        <Outlet />
        {/* <Routes>
          <Route path={'/' || '/articles'} element={<List />} />
          <Route path={'/articles/:slug'} element={<ItemList />} />
        </Routes> */}
        {/* <Authorization /> */}
        {/* 
        <Pagination
          defaultCurrent={1}
          total={total}
          current={page}
          defaultPageSize={5}
          hideOnSinglePage
          showSizeChanger={false}
          // centered
          onChange={onChange}
          style={{ display: 'inline-block' }}
        /> */}
      </main>
    </>
  );
}
