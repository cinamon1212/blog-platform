import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { useActions } from '../../../hooks/useAction';

import classes from './ItemList.module.scss';
import { Confirm } from './Confirm/Confirm';

const getElementProps = (
  { createdAt, slug, title, favoritesCount, tagList, description, author, body, favorited },
  isShowText,
) => {
  const date = createdAt ? format(new Date(createdAt), 'MMMM d, yyyy') : null;

  let res = { createdAt, slug, title, favoritesCount, tagList, description, author, date, favorited };
  if (isShowText) res = { ...res, body };

  return res;
};

export function ItemList(props) {
  const { fetchArticleBySlug, favoriteIcon, unFavoriteIcon } = useActions();
  const item = useSelector((state) => state.articleReducer.getArticle.openedItem);
  const newPerson = useSelector((state) => state.accountReducer.personData);
  const liked = JSON.parse(localStorage.getItem('liked'));

  const location = useLocation();

  const { id } = useParams();
  let navigate = useNavigate();
  const buttonsContainer = useRef();

  useEffect(() => {
    if (id) fetchArticleBySlug(id);
  }, [id]);

  const { createdAt, slug, title, favoritesCount, tagList, description, author, body, date } = Object.keys(props).length
    ? { ...getElementProps(props, false) }
    : { ...getElementProps(item, true) };

  if (newPerson && item && author) {
    if (Object.keys(newPerson).length && Object.keys(item).length && Object.keys(author).length) {
      if (newPerson.user.username === author.username && buttonsContainer.current && location.pathname !== '/') {
        buttonsContainer.current.classList.remove(`${classes['list__buttons-container--hidden']}`);
      } else if (buttonsContainer.current) {
        buttonsContainer.current.classList.add(`${classes['list__buttons-container--hidden']}`);
      }
    }
  }

  const onIconClick = () => {
    const token = localStorage.getItem('token');
    if ((!liked || !liked.includes(slug)) && token) favoriteIcon({ slug: slug, token });
    else if (token) unFavoriteIcon({ slug: slug, token });
  };

  return (
    <li className={classes.list__item}>
      <div className={classes['list__item-description']}>
        <header className={classes['list__item-header']}>
          <Link to={`/articles/${slug}`}>
            <h3 className={classes['list__item-title']}>{title}</h3>
          </Link>
          <div className={classes['list__item-icon']}>
            <div
              className={
                !Object.keys(newPerson).length || !liked.includes(slug)
                  ? classes['list__item-heart']
                  : `${classes['list__item-heart']} ${classes['list__item-heart--active']}`
              }
              onClick={onIconClick}
            ></div>
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

        <ReactMarkdown className={classes['list__item-body']}>{body ? body : ''}</ReactMarkdown>
      </div>
      <div className={classes['list__item-preview']}>
        <div className={classes['list__item-person']}>
          <div className={classes['list__item-date']}>
            <h3 className={classes['list__item-name']}>{author ? author.username : null}</h3>
            <span className={classes['list__item-data']}>{createdAt ? date : null} </span>
          </div>
          <img src={author ? author.image : null} alt="person-icon" className={classes['list__item-people']} />
        </div>

        <div
          className={`${classes['list__buttons-container']} ${classes['list__buttons-container--hidden']}`}
          ref={buttonsContainer}
        >
          <Confirm />
          <button
            type="button"
            className={classes['list__create-article']}
            onClick={() => navigate(`/articles/${item.slug}/edit`)}
          >
            Edit
          </button>
        </div>
      </div>
    </li>
  );
}
