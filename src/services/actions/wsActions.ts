import { AppDispatch, RootState } from '../store';

export const WS_FEED_START = 'WS_FEED_START';
export const WS_ORDERS_START = 'WS_ORDERS_START';
export const WS_CLOSE = 'WS_CLOSE';

export const startFeedListening = () => (dispatch: AppDispatch) => {
  dispatch({
    type: WS_FEED_START,
    payload: 'wss://norma.nomoreparties.space/orders/all'
  });
};

export const startOrdersListening =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().user;
    if (user) {
      const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
      dispatch({
        type: WS_ORDERS_START,
        payload: `wss://norma.nomoreparties.space/orders?token=${token}`
      });
    }
  };

export const stopFeedListening = () => ({
  type: WS_CLOSE
});

export const stopOrdersListening = () => ({
  type: WS_CLOSE
});
