import { rootReducer } from './rootReducer';
import { initialState as ingredientsInitialState } from './slices/ingredientsSlice';
import { initialState as burgerBuilderInitialState } from './slices/burgerBuilderSlice';
import { initialState as userInitialState } from './slices/userSlice';
import { initialState as feedInitialState } from './slices/feedSlice';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: ingredientsInitialState,
      burgerBuilder: burgerBuilderInitialState,
      user: userInitialState,
      feed: feedInitialState
    });
  });
});
