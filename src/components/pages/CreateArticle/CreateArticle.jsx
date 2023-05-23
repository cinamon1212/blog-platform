import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { NavLink } from 'react-router-dom';
import { useRef, useState } from 'react';

import { useActions } from '../../../hooks/useAction';
import { itemCreator, titleRegister, textRegister, descriptionRegister } from '../../../helpers/createInputsItem';

import classes from './CreateArticle.module.scss';

export function CreateArticle() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onSubmit' });

  const [inputId, setInputId] = useState(1);

  const errorContainer = useRef();
  const addTag = useRef();
  const { clearErrors, addTags, deleteTags } = useActions();

  const error = useSelector((state) => state.accountReducer.errors);
  const tagsList = useSelector((state) => state.articleReducer.postArticle.tags);

  if (error && Object.keys(error).length && errorContainer.current)
    errorContainer.current.classList.remove(`${classes['create-article__error-container--hidden']}`);
  else if (errorContainer.current)
    errorContainer.current.classList.add(`${classes['create-article__error-container--hidden']}`);

  if (tagsList.length && addTag.current) addTag.current.classList.add(`${classes['create-article__add-tag--hidden']}`);
  else if (addTag.current) addTag.current.classList.remove(`${classes['create-article__add-tag--hidden']}`);

  const onSubmit = (e, data) => {
    e.preventDefault();
    console.log(data);
    reset();
  };

  const onClick = () => {
    errorContainer.current.classList.add(`${classes['create-article__error-container--hidden']}`);
    clearErrors();
  };

  const addNewTag = (e) => {
    console.log('add');
    e.preventDefault();
    addTags(inputId);
    setInputId(inputId + 1);
  };

  const deleteTag = (e, tag) => {
    console.log('delete');
    e.preventDefault();
    deleteTags(tag.inputId);
  };

  const buttonAddTag = (
    <button className={classes['create-article__add-tag']} onClick={addNewTag}>
      Add tag
    </button>
  );

  return (
    <div className={classes['create-article']}>
      <h1 className={classes['create-article__title']}>Create new article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['create-article__list']}>
          {itemCreator(
            'Title',
            register(Object.keys(titleRegister)[0], titleRegister.title),
            'title',
            errors,
            'create-article',
          )}
          {itemCreator(
            'Short description',
            register(Object.keys(descriptionRegister)[0], descriptionRegister.description),
            'description',
            errors,
            'create-article',
            'Description',
          )}
          {itemCreator(
            'Text',
            register(Object.keys(textRegister)[0], textRegister.text),
            'text',
            errors,
            'create-article',
            '',
            'create-article__textarea',
          )}
          <div className={classes['create-article__item']}>
            <h4 className={classes['create-article__head']}>Tags</h4>
            {tagsList.map((tag, i) => {
              return (
                <div key={tag.inputId} className={classes['create-article__tag']}>
                  <input
                    type="text"
                    placeholder={'Tag'}
                    className={`${classes['create-article__input-name']} ${classes['create-article__input-name--tag']}`}
                    {...register('tag', {
                      required: false,
                    })}
                    onSubmit={(e) => e.stopPropagation()}
                  />

                  <button className={classes['create-article__delete-tag']} onClick={(e) => deleteTag(e, tag)}>
                    Delete
                  </button>
                  {i + 1 === tagsList.length ? buttonAddTag : null}
                </div>
              );
            })}
            <button className={classes['create-article__add-tag']} onClick={addNewTag} ref={addTag}>
              Create tags
            </button>
          </div>
        </div>

        <input type="submit" className={classes['create-article__input-submit']} value="Send" />
      </form>
      <div
        className={`${classes['create-article__error-container']} ${classes['create-article__error-container--hidden']}`}
        ref={errorContainer}
      >
        <button className={classes['create-article__error-button']} onClick={onClick}>
          ✖
        </button>
        Something went wrong... Try to sign up again
      </div>
    </div>
  );
}
