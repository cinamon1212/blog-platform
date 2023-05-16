import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Pagination } from 'antd';

import { fetchArticles } from '../../store/articleSlice';
import { ItemList } from '../ItemList/ItemList';

import classes from './List.module.scss';

export function List() {
  const articles = useSelector((state) => state.articles.articles);
  const page = useSelector((state) => state.articles.page);
  const dispatch = useDispatch();
  // console.log(articles);

  const total = useSelector((state) => state.articles.articlesCount);

  const onChange = (e) => {
    dispatch(fetchArticles(e));
  };

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, []);

  return (
    <>
      <ul className={classes.list}>
        {articles.map((article) => (
          <ItemList
            key={article.slug}
            slug={article.slug}
            title={article.title}
            description={article.description}
            favoritesCount={article.favoritesCount}
            author={article.author}
            createdAt={article.createdAt}
            tagList={article.tagList}
          />
        ))}
      </ul>
      <Pagination
        defaultCurrent={1}
        total={total}
        current={page}
        defaultPageSize={5}
        hideOnSinglePage
        showSizeChanger={false}
        // centered
        onChange={onChange}
        style={{ display: 'inline-block', marginTop: '30px' }}
      />
    </>
  );
}
