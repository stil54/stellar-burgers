import userReducer, {
  initialState,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
} from './userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('user reducer', () => {
  it('should handle getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should handle getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle getUser.rejected', () => {
    const errorMessage = 'Failed to get user';
    const action = {
      type: getUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('should handle updateUser.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'Updated User' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: updatedUser
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(updatedUser);
    expect(state.error).toBeNull();
  });

  it('should handle logoutUser.fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser
    };

    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(stateWithUser, action);

    expect(state.user).toBeNull();
  });
});
