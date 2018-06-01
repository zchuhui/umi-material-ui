import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
    pageSize:null,
  },
  reducers: {
    save(state, { payload}) {
      return { ...state,...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      
      const {data} = yield call(usersService.fetch,{...payload});
      console.log('data',data);
      
      if (data && data.users) {
        const { users, start,count,total} = data;
        console.log(users,start);
        
        yield put({
          type: 'save',
          payload: {
            list: users,
            total: total,
            page: start,
            pageSize:count,
          },
        });
      }
      
    },


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
