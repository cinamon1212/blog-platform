import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { useActions } from '../../../hooks/useAction';

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
  const { fetchArticleBySlug, deleteArticle } = useActions();
  const item = useSelector((state) => state.articleReducer.getArticle.openedItem);
  const newPerson = useSelector((state) => state.accountReducer.personData);
  // const error = useSelector((state) => state.articleReducer.errors);

  const { id } = useParams();
  let navigate = useNavigate();
  const deleteButton = useRef();
  const editButton = useRef();

  useEffect(() => {
    if (id) fetchArticleBySlug(id);
  }, [id]);

  const { createdAt, slug, title, favoritesCount, tagList, description, author, month, day, year, body } = Object.keys(
    props,
  ).length
    ? { ...getElementProps(props, false) }
    : { ...getElementProps(item, true) };

  if (newPerson && item && Object.keys(newPerson).length && Object.keys(item).length) {
    if (newPerson.user.username === item.author.username && deleteButton.current && editButton.current) {
      deleteButton.current.classList.remove(`${classes['list__delete-tag--hidden']}`);
      editButton.current.classList.remove(`${classes['list__create-article--hidden']}`);
    } else if (deleteButton.current && editButton.current) {
      deleteButton.current.classList.add(`${classes['list__delete-tag--hidden']}`);
      editButton.current.classList.add(`${classes['list__create-article--hidden']}`);
    }
  }

  const deleteArticles = () => {
    deleteArticle({ slug: item.slug, token: localStorage.getItem('token') });
    return navigate('/');
  };

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

        <ReactMarkdown className={classes['list__item-body']}>{body ? body : ''}</ReactMarkdown>
      </div>
      <div className={classes['list__item-preview']}>
        <div className={classes['list__item-person']}>
          <div>
            <h3 className={classes['list__item-name']}>{author ? author.username : null}</h3>
            <span className={classes['list__item-data']}>{createdAt ? `${month} ${day}, ${year}` : null} </span>
          </div>
          <img src={author ? author.image : null} alt="person-icon" className={classes['list__item-people']} />
        </div>

        <div className={classes['list__buttons-container']}>
          <button
            type="button"
            className={`${classes['list__delete-tag']} ${classes['list__delete-tag--hidden']}`}
            ref={deleteButton}
            onClick={deleteArticles}
          >
            Delete
          </button>
          <button
            type="button"
            className={`${classes['list__create-article']} ${classes['list__create-article--hidden']}`}
            onClick={() => navigate(`/articles/${item.slug}/edit`)}
            ref={editButton}
          >
            Edit
          </button>
        </div>

        {/* <div className={classes['list__item-people']}></div> */}
      </div>
    </li>
  );
}
