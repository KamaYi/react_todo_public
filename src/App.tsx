import React, { Suspense } from 'react';
import { Spin, ConfigProvider } from 'antd';
import { Redirect,BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IRoute } from './router/config';
import { layoutRouteList } from './router/utils';
import config from './config';
import zhCN from "antd/es/locale/zh_CN";

import { Provider } from 'react-redux';
import store from './store';

import './styles/index.less';

function App() {
  return (
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<Spin size="large" className="layout__loading" />}>
        <Router basename={config.BASENAME}>
          <Switch>
          <Redirect exact from="/" to="/system/login" />
            {layoutRouteList.map((route: IRoute) => (
              <Route
                key={config.BASENAME + route.path}
                path={route.path}
                component={route.component}
              ></Route>
            ))}
          </Switch>
        </Router>
      </Suspense>
    </ConfigProvider>
  </Provider>
  );
}

export default App;
