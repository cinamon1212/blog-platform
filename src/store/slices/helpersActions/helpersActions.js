import { createAsyncThunk } from '@reduxjs/toolkit';

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

export const fetchRegister = createAsyncThunk('account/fetchPostPersonData', async function (user) {
  const response = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: user,
  });

  if (response.ok) {
    return loginCallback(user);
  } else return Promise.reject(new Error(response));
});

const loginCallback = async (user) => {
  const response = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: user,
  });

  if (response.ok) {
    // localStorage.setItem('user', JSON.stringify(user));
    const res = await response.json();

    if (localStorage.getItem('token')) localStorage.removeItem('token');
    localStorage.setItem('token', res.user.token);
    return res;
  } else return Promise.reject(new Error(response.statusText));
};

export const fetchLogin = createAsyncThunk('account/fetchLogin', loginCallback);

export const fetchEditProfile = createAsyncThunk('account/fetchEditProfile', async function (user) {
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      Authorization: `Token ${user.user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const res = await response.json();

    if (localStorage.getItem('token')) localStorage.removeItem('token');
    localStorage.setItem('token', res.user.token);
    return res;
  } else return Promise.reject(new Error(response.statusText));
});

export const fetchGetLoginPerson = createAsyncThunk('account/fetchGetLoginPerson', async function (token) {
  const response = await fetch('https://blog.kata.academy/api/user', {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const res = await response.json();

    if (localStorage.getItem('token')) localStorage.removeItem('token');
    localStorage.setItem('token', res.user.token);
    return res;
  } else return Promise.reject(new Error(response.statusText));
});

export const createArticle = createAsyncThunk('articles/createArticle', async function (article) {
  const response = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      Authorization: `Token ${article.article.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (response.ok) {
    const res = await response.json();
    return res;
  } else return Promise.reject(new Error(response.statusText));
});

export const updateArticle = createAsyncThunk('articles/updateArticle', async function (article) {
  const response = await fetch(`https://blog.kata.academy/api/articles/${article.article.slug}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${article.article.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (response.ok) {
    const res = await response.json();
    return res;
  } else return Promise.reject(new Error(response.statusText));
});

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async function ({ slug, token }) {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const res = await response.json();
    return res;
  } else return Promise.reject(new Error(response.statusText));
});
