// 请求相关（与后台系统的交互）
// .src/services/user.js

import request from '../utils/request';
import qs from 'qs';

export { fetchDB, removeUser, patchUser, createUser };

var baseUrl = `http://localhost:9090/users/`;

function fetchDB(){
  return request(`${baseUrl}`, {
    method: 'GET',
    headers: new Headers({
		    'Content-Type': 'application/json'
	  }),
  });
}

function removeUser(id) {
  return request (`${baseUrl}${id}`, {
    method: 'DELETE',
  });
}

function patchUser(id, values) {
  return request(`${baseUrl}${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: new Headers({
		    'Content-Type': 'application/json'
	  }),
  });
}

function createUser(values) {
  console.log(`[createUsers]=> ${values}`);
  return request(`${baseUrl}`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: new Headers({
		    'Content-Type': 'application/json'
	  }),
  });
}
