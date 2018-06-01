import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": () => React.createElement(require('C:/Users/Administrator/AppData/Local/Yarn/config/global/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/404' })
      },
      {
        "path": "/book",
        "exact": true,
        "component": require('../book/page.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/page1",
        "exact": true,
        "component": () => React.createElement(require('C:/Users/Administrator/AppData/Local/Yarn/config/global/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/page1' })
      },
      {
        "path": "/page2",
        "exact": true,
        "component": () => React.createElement(require('C:/Users/Administrator/AppData/Local/Yarn/config/global/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/page2' })
      },
      {
        "path": "/universal",
        "exact": true,
        "component": () => React.createElement(require('C:/Users/Administrator/AppData/Local/Yarn/config/global/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/universal' })
      },
      {
        "path": "/users",
        "exact": true,
        "component": require('../users/page.js').default
      },
      {
        "component": () => React.createElement(require('C:/Users/Administrator/AppData/Local/Yarn/config/global/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', routes: '[{"path":"/","component":"./src\\\\layouts\\\\index.js","routes":[{"path":"/404","exact":true,"component":"./src\\\\pages\\\\404.js"},{"path":"/book","exact":true,"component":"./src\\\\pages\\\\book\\\\page.js"},{"path":"/","exact":true,"component":"./src\\\\pages\\\\index.js"},{"path":"/page1","exact":true,"component":"./src\\\\pages\\\\page1.js"},{"path":"/page2","exact":true,"component":"./src\\\\pages\\\\page2.js"},{"path":"/universal","exact":true,"component":"./src\\\\pages\\\\universal.js"},{"path":"/users","exact":true,"component":"./src\\\\pages\\\\users\\\\page.js"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
