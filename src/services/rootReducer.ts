import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerBuilderReducer from './slices/burgerBuilderSlice';
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerBuilder: burgerBuilderReducer,
  user: userReducer,
  feed: feedReducer
});

export type RootState = ReturnType<typeof rootReducer>;
