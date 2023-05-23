import { createSlice } from '@reduxjs/toolkit';

import { fetchArticleBySlug, fetchArticles } from './helpersActions/helpersActions';

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
  },
  reducers: {
    addTags: (state, action) => {
      state.postArticle.tags.push({ inputId: action.payload, inputValue: '' });
    },
    deleteTags: (state, action) => {
      state.postArticle.tags = state.postArticle.tags.filter((tag) => tag.inputId !== action.payload);
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
  },
});

export const { actions, reducer } = articleSlice;
