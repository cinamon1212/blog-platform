import { createSlice } from '@reduxjs/toolkit';

import { fetchRegister, fetchLogin, fetchEditProfile, fetchGetLoginPerson } from './helpersActions/helpersActions';

const accountSlice = createSlice({
   name: 'account',
   initialState: {
      personData: {},
   },
   reducers: {
      clearState(state) {
         state.personData = {};
         localStorage.removeItem('token');
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
         state.personData = { ...action.payload };
      });

      builder.addCase(fetchLogin.fulfilled, (state, action) => {
         state.personData = { ...action.payload };
      });

      builder.addCase(fetchGetLoginPerson.fulfilled, (state, action) => {
         state.personData = { ...action.payload };
      });

      builder.addCase(fetchGetLoginPerson.rejected, (state, action) => {
         console.log(action);
      });

      builder.addCase(fetchEditProfile.fulfilled, (state, action) => {
         console.log(state.personData.user.username);
         const liked = JSON.parse(localStorage.getItem('liked'));
         if (liked.length)
            liked.forEach((element) => {
               if (element.profile === state.personData.user.username) element.profile = action.payload.user.username;
            });
         localStorage.setItem('liked', JSON.stringify(liked));
         state.personData = { ...action.payload };
      });

      builder.addCase(fetchEditProfile.rejected, (state, action) => {
         console.log(action);
      });
   },
});

export const { actions, reducer } = accountSlice;
