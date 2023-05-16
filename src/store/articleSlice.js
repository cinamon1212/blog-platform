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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
      state.page = action.meta.arg;
    });

    builder.addCase(fetchArticleBySlug.fulfilled, (state, action) => {
      state.openedItem = { ...action.payload.article };
    });
  },
});

export const { addArticles } = articleSlice.actions;

export default articleSlice.reducer;
