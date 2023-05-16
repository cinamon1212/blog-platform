import { configureStore } from '@reduxjs/toolkit';

import articleReduce from './articleSlice';

export default configureStore({
  reducer: { articles: articleReduce },
});
