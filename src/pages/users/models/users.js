import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload}) {
      return { ...state,...payload };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      
      if (data.code == 200) {
        const list = data.data.list;
        
        yield put({
          type: 'save',
          payload: {
            list: list,
            total: list.length,
            page: 1
          },
        });
      }
      
    },

    *search({ payload }, { call, put }) {
      const { data, headers } = yield call(usersService.search, { q:'hao ' });
      console.log('book data',data);
      
      if (data.code == 200) {
        /* const list = data.data.list;

        yield put({
          type: 'save',
          payload: {
            list: list,
            total: list.length,
            page: 1
          },
        }); */
      }

    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        dispatch({ type: 'search',});
        /* if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        } */
      });
    },
  },
};
