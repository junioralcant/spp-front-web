export const TOKEN_KEY = '@airbnb-Token';
export const USER = 'user';

export const isAuthenticated = () =>
  localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => JSON.parse(localStorage.getItem(USER));

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const user = (user) => {
  localStorage.setItem(USER, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER);
};
