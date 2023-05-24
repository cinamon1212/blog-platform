import { createSlice } from '@reduxjs/toolkit';

import {
  fetchArticleBySlug,
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from './helpersActions/helpersActions';

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    getArticle: {
      articles: [],
      status: null,
      error: null,
      tags: [],
      openedItem: {},
      articlesCount: 0,
      page: 1,
      loading: false,
    },
    postArticle: {
      tags: [],
    },
    errors: [],
  },
  reducers: {
    addTags: (state, action) => {
      if (typeof action.payload === 'object') state.postArticle.tags = action.payload;
      else state.postArticle.tags.push({ inputId: action.payload, inputValue: '' });
    },
    deleteTags: (state, action) => {
      state.postArticle.tags = state.postArticle.tags.filter((tag) => tag.inputId !== action.payload);
    },
    tagValueChange: (state, action) => {
      state.postArticle.tags[action.payload.id].inputValue = action.payload.value;
    },
    clearOpenedItem: (state) => {
      state.getArticle.openedItem = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.getArticle.articles = [...action.payload.articles];
      state.getArticle.articlesCount = action.payload.articlesCount;
      state.getArticle.page = action.meta.arg;
      state.getArticle.loading = false;
    });

    builder.addCase(fetchArticles.pending, (state) => {
      state.getArticle.loading = true;
    });

    builder.addCase(fetchArticles.rejected, (action) => {
      console.log(`FetchArticles - rejected action: ${action}`);
    });

    builder.addCase(fetchArticleBySlug.fulfilled, (state, action) => {
      state.getArticle.openedItem = { ...action.payload.article };
    });

    builder.addCase(fetchArticleBySlug.rejected, (action) => {
      console.log(`FetchArticleBySlug - rejected action: ${action}`);
    });

    builder.addCase(createArticle.rejected, (state, action) => {
      state.errors = { ...action.error };
    });

    builder.addCase(updateArticle.rejected, (state, action) => {
      state.errors = { ...action.error };
    });

    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.errors = { ...action.error };
    });
  },
});

export const { actions, reducer } = articleSlice;
