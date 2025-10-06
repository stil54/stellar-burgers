// services/slices/feedSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TFeed } from '@utils-types';
import {
  getFeedsApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../../utils/burger-api';

export type TFeedState = {
  feed: TFeed;
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialFeed: TFeed = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const initialState: TFeedState = {
  feed: initialFeed,
  orders: [],
  loading: false,
  error: null
};

export const getFeeds = createAsyncThunk('feed/getAll', async () => {
  const response = await getFeedsApi();
  return response;
});

export const getOrders = createAsyncThunk('feed/getOrders', async () => {
  const response = await getOrdersApi();
  return response.orders;
});

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<TFeed>) => {
      state.feed = action.payload;
    },
    addOrder: (state, action: PayloadAction<TOrder>) => {
      state.feed.orders.unshift(action.payload);
      state.feed.total += 1;
      state.feed.totalToday += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Feeds
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      })
      // Get Orders
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      // Get Order by Number
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        if (
          action.payload &&
          !state.orders.find((order) => order._id === action.payload._id)
        ) {
          state.orders.push(action.payload);
        }
      });
  }
});

export const { setFeed, addOrder } = feedSlice.actions;
export default feedSlice.reducer;
