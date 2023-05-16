import { useEffect } from 'react';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
// import Markdown from 'markdown-to-jsx';

import { fetchArticleBySlug } from '../../store/articleSlice';

import classes from './ItemList.module.scss';

const getElementProps = (
  { createdAt, slug, title, favoritesCount, tagList, description, author, body },
  isShowText,
) => {
  let date;
  let month;
  let day;
  let year;

  if (createdAt) {
    date = new Date(createdAt);
    month = format(date.getMonth(), 'MMMM');
    day = date.getDay() + 1;
    year = date.getFullYear();
  }

  let res = { createdAt, slug, title, favoritesCount, tagList, description, author, month, day, year };
  if (isShowText) res = { ...res, body };

  return res;
};

export function ItemList(props) {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.articles.openedItem);

  const { createdAt, slug, title, favoritesCount, tagList, description, author, month, day, year, body } = Object.keys(
    props,
  ).length
    ? { ...getElementProps(props, false) }
    : { ...getElementProps(item, true) };

  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(fetchArticleBySlug(id));
  }, [id]);

  if (body) console.log(body);

  return (
    <li className={classes.list__item}>
      <div className={classes['list__item-description']}>
        <header className={classes['list__item-header']}>
          <Link to={`/articles/${slug}`}>
            <h3 className={classes['list__item-title']}>{title}</h3>
          </Link>
          <div className={classes['list__item-icon']}>
            <div className={classes['list__item-heart']}></div>
            <span>{favoritesCount}</span>
          </div>
        </header>
        <div className={classes['list__item-tags']}>
          {tagList &&
            tagList.map((tag, i) => {
              if (tag && tag.trim())
                return (
                  <span className={classes['list__item-tag']} key={i}>
                    {tag}
                  </span>
                );
            })}
        </div>
        <p className={classes['list__item-text']}>{description}</p>

        {/* <Markdown options={{ forceInline: false }}>{body ? body : ''}</Markdown> */}
        <ReactMarkdown>{body ? body : ''}</ReactMarkdown>

        {/* {body ? <div className={classes['list__item-text']}>{body}</div> : null} */}
      </div>
      <div className={classes['list__item-preview']}>
        <div className={classes['list__item-person']}>
          <h3 className={classes['list__item-name']}>{author ? author.username : null}</h3>
          <span className={classes['list__item-data']}>{createdAt ? `${month} ${day}, ${year}` : null} </span>
        </div>
        {/* <div className={classes['list__item-people']}></div> */}
        <img src={author ? author.image : null} alt="person-icon" className={classes['list__item-people']} />
      </div>
    </li>
  );
}
