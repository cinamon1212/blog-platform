import { createSlice } from '@reduxjs/toolkit';

import {
  fetchArticleBySlug,
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  favoriteIcon,
  unFavoriteIcon,
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
      title: '',
      description: '',
      body: '',
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
      state.postArticle.tags = [];
      state.getArticle.tags = [];
    },
    inputValueChange: (state, action) => {
      state.getArticle.openedItem[action.payload.name] = action.payload.inputValue;
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
      console.log(action);
    });

    builder.addCase(updateArticle.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(deleteArticle.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(favoriteIcon.fulfilled, (state, action) => {
      state.getArticle.articles.map((article) => {
        if (article.slug === action.payload.article.slug) {
          const liked = JSON.parse(localStorage.getItem('liked'));

          if (!liked) localStorage.setItem('liked', JSON.stringify([action.payload.article.slug]));
          else localStorage.setItem('liked', JSON.stringify([...liked, action.payload.article.slug]));
          article.favoritesCount = action.payload.article.favoritesCount;
          article.favorited = action.payload.article.favorited;
          state.getArticle.openedItem.favoritesCount = action.payload.article.favoritesCount;
          state.getArticle.openedItem.favorited = action.payload.article.favorited;
        }
      });
    });

    builder.addCase(favoriteIcon.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(unFavoriteIcon.fulfilled, (state, action) => {
      state.getArticle.articles.map((article) => {
        if (article.slug === action.payload.article.slug) {
          const liked = JSON.parse(localStorage.getItem('liked'));
          const resLiked = liked.filter((slug) => {
            if (slug === action.payload.article.slug) return false;
            else return true;
          });
          localStorage.setItem('liked', JSON.stringify([...resLiked]));
          article.favoritesCount = action.payload.article.favoritesCount;
          article.favorited = action.payload.article.favorited;
          state.getArticle.openedItem.favoritesCount = action.payload.article.favoritesCount;
          state.getArticle.openedItem.favorited = action.payload.article.favorited;
        }
      });
    });

    builder.addCase(unFavoriteIcon.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const { actions, reducer } = articleSlice;
