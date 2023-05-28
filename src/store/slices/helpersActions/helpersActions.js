import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async function (page, { rejectWithValue }) {
   const response = await fetch(
      `https://blog.kata.academy/api/articles?limit=5${page ? `&offset=${(page - 1) * 5}` : ''}`,
   );
   if (response.ok) return await response.json();
   else return rejectWithValue(new Error(response));
});

export const fetchArticleBySlug = createAsyncThunk(
   'articles/fetchArticleBySlug',
   async function (slug, { rejectWithValue }) {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
      if (response.ok) return await response.json();
      else return rejectWithValue(new Error(response));
   },
);

export const fetchRegister = createAsyncThunk(
   'account/fetchPostPersonData',
   async function (user, { rejectWithValue }) {
      const response = await fetch('https://blog.kata.academy/api/users', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: user,
      });

      if (response.ok) {
         return loginCallback(user);
      } else
         return rejectWithValue(
            `Could not fetch https://blog.kata.academy/api/users, response status: ${response.status}`,
         );
   },
);

const loginCallback = async (user) => {
   const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: user,
   });

   if (response.ok) {
      const res = await response.json();

      if (localStorage.getItem('token')) localStorage.removeItem('token');
      localStorage.setItem('token', res.user.token);
      return res;
   } else return `Could not fetch https://blog.kata.academy/api/users/login, response status: ${response.status}`;
};

export const fetchLogin = createAsyncThunk('account/fetchLogin', loginCallback);

export const fetchEditProfile = createAsyncThunk(
   'account/fetchEditProfile',
   async function (user, { rejectWithValue }) {
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
      } else
         return rejectWithValue(
            `Could not fetch https://blog.kata.academy/api/users, response status: ${response.status}`,
         );
   },
);

export const fetchGetLoginPerson = createAsyncThunk(
   'account/fetchGetLoginPerson',
   async function (token, { rejectWithValue }) {
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
      } else return rejectWithValue(new Error(response));
   },
);

export const createArticle = createAsyncThunk('articles/createArticle', async function (article, { rejectWithValue }) {
   const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
         Authorization: `Token ${article.article.token}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
   });

   if (response.ok) return await response.json();
   else
      return rejectWithValue(
         `Could not fetch https://blog.kata.academy/api/users, response status: ${response.status}`,
      );
});

export const updateArticle = createAsyncThunk('articles/updateArticle', async function (article, { rejectWithValue }) {
   const response = await fetch(`https://blog.kata.academy/api/articles/${article.article.slug}`, {
      method: 'PUT',
      headers: {
         Authorization: `Token ${article.article.token}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
   });

   if (response.ok) return await response.json();
   else
      return rejectWithValue(
         `Could not fetch https://blog.kata.academy/api/users, response status: ${response.status}`,
      );
});

export const deleteArticle = createAsyncThunk(
   'articles/deleteArticle',
   async function ({ slug, token }, { rejectWithValue }) {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
         method: 'DELETE',
         headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
         },
      });
      console.log(response);
      if (response.ok) return await response.json();
      else rejectWithValue('Error delete');
   },
);

export const favoriteIcon = createAsyncThunk(
   'articles/favoriteIcon',
   async function ({ slug, token, profile }, { rejectWithValue }) {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
         method: 'POST',
         headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
         },
      });

      if (response.ok) {
         const result = await response.json();
         return { ...result, profile };
      } else rejectWithValue(new Error(response.statusText));
   },
);

export const unFavoriteIcon = createAsyncThunk(
   'articles/unFavoriteIcon',
   async function ({ slug, token }, { rejectWithValue }) {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
         method: 'DELETE',
         headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
         },
      });

      if (response.ok) return await response.json();
      else rejectWithValue(new Error(response.statusText));
   },
);
