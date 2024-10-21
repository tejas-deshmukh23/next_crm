import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const setToken = (token) => {
  Cookies.set('token', token, { expires: 7, secure: true });
};

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = () => {
  Cookies.remove('token');
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};