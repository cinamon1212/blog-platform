import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { useActions } from '../../../hooks/useAction';
import { itemCreator, titleRegister, textRegister, descriptionRegister } from '../../../helpers/createInputsItem';

import classes from './CreateArticle.module.scss';

export function CreateArticle() {
   const { addTags, deleteTags, createArticle, updateArticle, tagValueChange, fetchArticleBySlug } = useActions();
   const [error, setError] = useState(false);
   const errorContainer = useRef();
   const addTag = useRef();

   // const error = useSelector((state) => state.accountReducer.errors);
   const tagsList = useSelector((state) => state.articleReducer.postArticle.tags);
   const item = useSelector((state) => state.articleReducer.getArticle.openedItem);

   const navigate = useNavigate();
   const { id } = useParams();
   const location = useLocation();

   const isEditingOrCreating = location.pathname.includes('edit') ? 'edit' : 'create';

   useEffect(() => {
      if (id && isEditingOrCreating === 'edit') fetchArticleBySlug(id);
   }, [id]);

   useEffect(() => {
      if (item.tagList) {
         const newTagsObj = [];
         item.tagList.forEach((tag, i) => {
            newTagsObj.push({ inputId: i, inputValue: tag });
         });
         addTags(newTagsObj);
      }
   }, [item.tagList]);

   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({ mode: 'onSubmit', defaultValues: isEditingOrCreating === 'edit' ? item : {} });

   if (error && errorContainer.current)
      errorContainer.current.classList.remove(`${classes['create-article__error-container--hidden']}`);
   else if (errorContainer.current)
      errorContainer.current.classList.add(`${classes['create-article__error-container--hidden']}`);

   if (tagsList.length && addTag.current) addTag.current.classList.add(`${classes['create-article__add-tag--hidden']}`);
   else if (addTag.current) addTag.current.classList.remove(`${classes['create-article__add-tag--hidden']}`);

   const onSubmit = (data) => {
      const token = localStorage.getItem('token');

      if (isEditingOrCreating === 'create') {
         const tags = [];
         for (const item in data) {
            if (item.includes('tag')) {
               tags.push(data[`${item}`]);
               delete data[`${item}`];
            }
         }
         const resData = { article: { ...data, tagList: tags, token } };
         createArticle(resData).then((result) => {
            if (typeof result.payload === 'string') setError(true);
            else return navigate('/');
         });
      } else if (isEditingOrCreating === 'edit') {
         const tags = [];
         tagsList.forEach((tag) => {
            tags.push(tag.inputValue);
         });
         const resData = { article: { ...data, tagList: tags, token } };
         updateArticle(resData).then((result) => {
            if (typeof result.payload === 'string') setError(true);
            else return navigate('/');
         });
      }
   };

   const onClick = () => {
      errorContainer.current.classList.add(`${classes['create-article__error-container--hidden']}`);
      setError(false);
   };

   const addNewTag = (e, id) => {
      e.preventDefault();
      addTags(id);
      // setInputId(inputId + 1);
   };

   const deleteTag = (e, id) => {
      e.preventDefault();
      deleteTags(id);
   };

   const onTagChange = (e, id) => {
      tagValueChange({ id, value: e.target.value });
   };

   return (
      <div className={classes['create-article']}>
         <h1 className={classes['create-article__title']}>
            {isEditingOrCreating === 'edit' ? 'Edit article' : 'Create new article'}
         </h1>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes['create-article__list']}>
               {itemCreator({
                  headText: 'Title',
                  register: register('title', titleRegister.title),
                  errorsKey: 'title',
                  errors,
                  classN: 'create-article',
                  // defaultValue: isEditingOrCreating === 'edit' ? item.title : '',
                  value: item.title ? item.title : '',
                  // noChanged: true,
               })}
               {itemCreator({
                  headText: 'Short description',
                  register: register('description', descriptionRegister.description),
                  errorsKey: 'description',
                  errors,
                  classN: 'create-article',
                  placeholder: 'Description',
                  // defaultValue: isEditingOrCreating === 'edit' ? item.description : '',
                  value: item.description ? item.description : '',
                  // noChanged: true,
               })}
               {itemCreator({
                  headText: 'Text',
                  register: register('body', textRegister.body),
                  errorsKey: 'body',
                  errors,
                  classN: 'create-article',
                  textareaClassN: 'create-article__textarea',
                  // defaultValue: isEditingOrCreating === 'edit' ? item.body : '',
                  value: item.body ? item.body : '',
                  // noChanged: true,
               })}
               <div className={classes['create-article__item']}>
                  <h4 className={classes['create-article__head']}>Tags</h4>
                  {tagsList.map((tag, i) => {
                     return (
                        <div key={i} className={classes['create-article__tag']}>
                           <input
                              type="text"
                              placeholder={'Tag'}
                              className={`${classes['create-article__input-name']} ${classes['create-article__input-name--tag']}`}
                              // defaultValue={typeof tag === 'object' ? tag.inputValue : tag}
                              value={tag.inputValue}
                              maxLength={20}
                              {...register(`tag-${i}`, { require: false })}
                              onChange={(e) => onTagChange(e, i)}
                           />

                           <button
                              type="button"
                              className={classes['create-article__delete-tag']}
                              onClick={(e) => deleteTag(e, i)}
                           >
                              Delete
                           </button>
                           {i + 1 === tagsList.length ? (
                              <button
                                 className={classes['create-article__add-tag']}
                                 onClick={(e) => addNewTag(e, i + 1)}
                                 type="button"
                              >
                                 Add tag
                              </button>
                           ) : null}
                        </div>
                     );
                  })}
                  <button
                     className={classes['create-article__add-tag']}
                     onClick={(e) => addNewTag(e, 0)}
                     ref={addTag}
                     type="button"
                  >
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
            Something went wrong... Try to create article again
         </div>
      </div>
   );
}
