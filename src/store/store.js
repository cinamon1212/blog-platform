import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducer as accountReducer } from './slices/accountSlice';
import { reducer as articleReducer } from './slices/articleSlice';

const reducers = combineReducers({
  accountReducer,
  articleReducer,
});

export default configureStore({
  reducer: reducers,
});
