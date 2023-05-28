import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spin } from 'antd';

import { useActions } from '../../../hooks/useAction';
import { ItemList } from '../ItemList/ItemList';

import { ArticlePagination } from './ArticlePagination/ArticlePagination';
import classes from './List.module.scss';

const Loader = () => (
   <div className={classes.spin}>
      <Spin size="large" />
   </div>
);

export function List() {
   const loading = useSelector((state) => state.articleReducer.getArticle.loading);
   const articles = useSelector((state) => state.articleReducer.getArticle.articles);
   const page = useSelector((state) => state.articleReducer.getArticle.page);

   const { fetchArticles } = useActions();

   useEffect(() => {
      fetchArticles(page);
   }, [page]);

   const content = loading ? (
      <Loader />
   ) : (
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
                  favorited={article.favorited}
               />
            ))}
         </ul>
         <ArticlePagination />
      </>
   );

   return content;
}
