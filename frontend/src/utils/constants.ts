export const apiURL = 'http://localhost:8000';
export const GOOGLE_CLIENT_ID = import.meta.env[
  'VITE_GOOGLE_CLIENT_ID'
] as string;

export const axiosRoutes = {
  users: '/users',
  sessions: '/users/sessions',
  google: '/users/google',
  gallery: '/gallery',
};

export const routes = {
  home: '/',
  register: '/auth/register',
  login: '/auth/login',
  userHomePage: '/my-gallery',
  newPhoto: '/new-photo',
  notFound: '*',
};
