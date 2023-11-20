import { GetUserRequest } from '@/requests/users.requests';
import { User } from '@tpoai/data-commons';
import axios from 'axios';

export function initAuth() {
  const isIndexRoute = location.pathname === '/';
  if (!hasAuthToken()) return isIndexRoute && location.replace('/');
  const existingToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
  if (!existingToken) removeAuth(!isIndexRoute);
  else setNewAuth(existingToken, localStorage.getItem('Authorization') !== null, isIndexRoute);
}

export function setNewAuth(v: string, persist = true, goToPanel = true) {
  sessionStorage.setItem('Authorization', v);
  if (persist) localStorage.setItem('Authorization', v);
  axios.defaults.headers.common['Authorization'] = `Bearer ${v}`;

  GetUserRequest()
    .then((v) => sessionStorage.setItem('User', JSON.stringify(v.data)))
    .catch(() => location.replace('/'))
    .finally(() => goToPanel && location.replace('/panel'));
}

export function removeAuth(goToLogin = true) {
  localStorage.removeItem('Authorization');
  sessionStorage.removeItem('Authorization');
  sessionStorage.removeItem('User');
  axios.defaults.headers.common['Authorization'] = null;
  if (goToLogin) location.replace('/');
}

export function hasAuthToken() {
  return axios.defaults.headers.common['Authorization'] !== null;
}

export function getCurrentUser(): User {
  const u = sessionStorage.getItem('User');
  return u ? JSON.parse(u) : null;
}
