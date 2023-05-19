import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async function (page) {
  const response = await fetch(
    `https://blog.kata.academy/api/articles?limit=5${page ? `&offset=${(page - 1) * 5}` : ''}`,
  );
  const data = await response.json();
  return data;
});

export const fetchArticleBySlug = createAsyncThunk('articles/fetchArticleBySlug', async function (slug) {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
  const data = await response.json();
  return data;
});

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: null,
    error: null,
    tags: [],
    openedItem: {},
    articlesCount: 0,
    page: 1,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
      state.page = action.meta.arg;
      state.loading = false;
    });

    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchArticles.rejected, (action) => {
      console.log(`FetchArticles - rejected action: ${action}`);
    });

    builder.addCase(fetchArticleBySlug.fulfilled, (state, action) => {
      state.openedItem = { ...action.payload.article };
    });

    builder.addCase(fetchArticleBySlug.rejected, (action) => {
      console.log(`FetchArticleBySlug - rejected action: ${action}`);
    });
  },
});

export const { actions, reducer } = articleSlice;
