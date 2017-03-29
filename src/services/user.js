// 请求相关（与后台系统的交互）
// .src/services/user.js

import request from '../utils/request';

const baseUrl = 'http://localhost:9090/users/';

function fetchDB() {
  return request(`${baseUrl}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}

function removeUser(id) {
  return request(`${baseUrl}${id}`, {
    method: 'DELETE',
  });
}

function patchUser(id, values) {
  return request(`${baseUrl}${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}

function createUser(values) {
  return request(`${baseUrl}`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}

export { fetchDB, removeUser, patchUser, createUser };
