import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  actions as accountActions,
  fetchRegister,
  fetchLogin,
  fetchGetLoginPerson,
} from '../store/slices/accountSlice';
import { fetchArticleBySlug, fetchArticles } from '../store/slices/articleSlice';

const rootAction = {
  ...accountActions,
  fetchRegister,
  fetchLogin,
  fetchGetLoginPerson,
  fetchArticleBySlug,
  fetchArticles,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
