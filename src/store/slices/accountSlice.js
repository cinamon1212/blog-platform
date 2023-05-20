import { createSlice } from '@reduxjs/toolkit';

import { fetchRegister, fetchLogin, fetchEditProfile, fetchGetLoginPerson } from './helpersActions/helpersActions';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    personData: {},
    errors: {},
  },
  reducers: {
    clearState(state) {
      state.personData = {};
      localStorage.clear();
    },
    clearErrors(state) {
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.personData = { ...action.payload };
    });

    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.errors = { ...action.error };
    });

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      console.log(action);
      state.personData = { ...action.payload };
    });

    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.errors = { ...action.error };
    });

    builder.addCase(fetchGetLoginPerson.fulfilled, (state, action) => {
      console.log(action);
      state.personData = { ...action.payload };
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
