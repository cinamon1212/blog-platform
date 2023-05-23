import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  fetchRegister,
  fetchLogin,
  fetchGetLoginPerson,
  fetchEditProfile,
  fetchArticleBySlug,
  fetchArticles,
} from '../store/slices/helpersActions/helpersActions';
import { actions as accountActions } from '../store/slices/accountSlice';
import { actions as articleActions } from '../store/slices/articleSlice';

const rootAction = {
  ...accountActions,
  ...articleActions,
  fetchRegister,
  fetchLogin,
  fetchGetLoginPerson,
  fetchArticleBySlug,
  fetchArticles,
  fetchEditProfile,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
