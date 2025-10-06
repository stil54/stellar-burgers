// utils/burger-api.ts
import {
  TIngredient,
  TOrder,
  TFeed,
  TUser,
  TLoginData,
  TRegisterData,
  TUpdateUserData,
  TOrdersData
} from './types';

const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const checkSuccess = <T>(res: any): T => {
  if (res && res.success) {
    return res;
  }
  throw new Error(`Response not successful: ${res}`);
};

// Функция для получения заголовков с авторизацией
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: token })
  };
};

const request = <T>(endpoint: string, options?: RequestInit): Promise<T> =>
  fetch(`${API_URL}${endpoint}`, options)
    .then((res) => checkResponse<T>(res))
    .then((data) => checkSuccess<T>(data));

// Ingredients
export const getIngredientsApi = (): Promise<TIngredient[]> =>
  request<{ data: TIngredient[] }>('/ingredients').then((res) => res.data);

// Orders
export const orderBurgerApi = (
  ingredients: string[]
): Promise<{ order: TOrder }> =>
  request<{ order: TOrder }>('/orders', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ ingredients })
  });

// User
export const registerUserApi = (
  data: TRegisterData
): Promise<{ user: TUser; accessToken: string; refreshToken: string }> =>
  request<{ user: TUser; accessToken: string; refreshToken: string }>(
    '/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

export const loginUserApi = (
  data: TLoginData
): Promise<{ user: TUser; accessToken: string; refreshToken: string }> =>
  request<{ user: TUser; accessToken: string; refreshToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

export const logoutApi = (): Promise<void> =>
  request('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  });

export const getUserApi = (): Promise<{ user: TUser }> =>
  request<{ user: TUser }>('/auth/user', {
    method: 'GET',
    headers: getAuthHeaders()
  });

export const updateUserApi = (
  data: TUpdateUserData
): Promise<{ user: TUser }> =>
  request<{ user: TUser }>('/auth/user', {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });

// Password
export const forgotPasswordApi = (data: { email: string }): Promise<void> =>
  request('/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

export const resetPasswordApi = (data: {
  password: string;
  token: string;
}): Promise<void> =>
  request('/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

// Feed
export const getFeedsApi = (): Promise<TFeed> => request<TFeed>('/orders/all');

export const getOrdersApi = (): Promise<TOrdersData> =>
  request<TOrdersData>('/orders', {
    method: 'GET',
    headers: getAuthHeaders()
  });

export const getOrderByNumberApi = (number: number): Promise<TOrdersData> =>
  request<TOrdersData>(`/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
