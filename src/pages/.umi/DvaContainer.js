import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ ...(require('/Users/zchuhui/codes/umi-material-ui/src/pages/index/models/index.js').default) });
app.model({ ...(require('/Users/zchuhui/codes/umi-material-ui/src/pages/book/models/book.js').default) });
app.model({ ...(require('/Users/zchuhui/codes/umi-material-ui/src/pages/users/models/users.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
