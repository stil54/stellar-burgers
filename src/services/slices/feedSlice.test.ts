import feedReducer, {
  initialState,
  getFeeds,
  getOrders,
  getOrderByNumber
} from './feedSlice';
import { TOrder, TFeed } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order-1',
  ingredients: ['ing-1', 'ing-2'],
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345
};

const mockFeed: TFeed = {
  orders: [mockOrder],
  total: 100,
  totalToday: 10
};

describe('feed reducer', () => {
  it('should handle getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle getFeeds.fulfilled', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockFeed
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.feed).toEqual(mockFeed);
    expect(state.error).toBeNull();
  });

  it('should handle getFeeds.rejected', () => {
    const errorMessage = 'Failed to fetch feeds';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle getOrders.fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: [mockOrder]
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([mockOrder]);
    expect(state.error).toBeNull();
  });

  it('should handle getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = feedReducer(initialState, action);

    expect(state.orders).toContain(mockOrder);
  });
});
