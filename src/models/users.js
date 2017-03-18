// src/models/users.js

import { hashHistory } from 'dva/router';
import { fetchDB, removeUser, patchUser, createUser } from '../services/user';

export default {
  namespace: 'users',
  state: {
    list: [],
  },
  reducers: {
    //聚合，統合資料處，故會回傳值也就是 state
    querySuccess(state, { payload: {data: list}}){
      console.log(`[reducers]執行 querySuccess`);
      return {...state, list};
    },
  },
  effects: {
    // 異步（非同步）處理區塊
    *queryDB({ payload }, { call, put }) {  // eslint-disable-line
      console.log(`[effect]queryDB`);
      let {data} = yield call(fetchDB);
      if(data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data
          }
        })
      }
    },
    *create({ payload: values }, {call, put }){
      yield call(createUser, values);
      yield put({ type: 'queryDB' });
    },
    *patch({ payload: { id, values }},{ call, put }){
      yield call(patchUser, id, values);
      yield put({ type: 'queryDB' });
    },
    *remove({payload: id}, { call, put }){
      yield call(removeUser, id);
      yield put({ type: 'queryDB' });
    },
  },
  subscriptions: {
    // 訂閱個 action, 當 action 觸發時執行動作, 其中 action 由 dispatch 操作
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'queryDB',
            payload: query
          });
        }
      });
    },
  },
};
