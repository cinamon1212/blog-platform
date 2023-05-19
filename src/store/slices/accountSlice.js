import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRegister = createAsyncThunk('account/fetchPostPersonData', async function (user) {
  const response = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: user,
  });

  if (response.ok) {
    const res = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: user,
    });

    if (res.ok) {
      return await res.json();
    } else return Promise.reject(new Error(response.statusText));
  } else return Promise.reject(new Error(response.statusText));
});

export const fetchLogin = createAsyncThunk('account/fetchLogin', async function (user) {
  const response = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: user,
  });

  if (response.ok) return await response.json();
  else return Promise.reject(new Error(response.statusText));
});

export const fetchEditProfile = createAsyncThunk('account/fetchEditProfile', async function (user, token) {
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: user,
  });

  if (response.ok) return await response.json();
  else return Promise.reject(new Error(response.statusText));
});

export const fetchGetLoginPerson = createAsyncThunk('account/fetchGetLoginPerson', async function (token) {
  const response = await fetch('https://blog.kata.academy/api/user', {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) return await response.json();
  else return Promise.reject(new Error(response.statusText));
});

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    personData: {},
    errors: {},
  },
  reducers: {
    clearState(state) {
      state.personData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      // const password = JSON.parse(action.meta.arg).password;
      state.personData = { ...action.payload.user };
    });

    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.errors = { ...action.error };
    });

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      const token = action.payload.user.token;
      localStorage.setItem('token', token);
      state.personData = { ...action.payload.user };
    });

    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.errors = { ...action.error };
    });

    builder.addCase(fetchGetLoginPerson.fulfilled, (state, action) => {
      state.personData = { ...action.payload.user };
    });

    builder.addCase(fetchGetLoginPerson.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(fetchEditProfile.fulfilled, (state, action) => {
      state.personData = { ...action.payload.user };
    });
  },
});

export const { actions, reducer } = accountSlice;
