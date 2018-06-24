import { queryIndex } from '../services/index';

export default {
  namespace: 'index',
  state: {
    text: 'test test',

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({
            type: 'fetch'
          })
        }
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(queryIndex, { ...payload });
      const { data, code, msg } = result.data

      if (code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            overview: data,
          }
        })
      }
    },
  },

};
