import React, { Suspense } from 'react';
import { Spin, ConfigProvider } from 'antd';
import Router from './router';
import zhCN from "antd/es/locale/zh_CN";
import { Provider } from 'react-redux';
import store from './store';

import '@/assets/less/index.less';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Suspense fallback={<Spin size="large" className="layout__loading" />}>
          <Router />
        </Suspense>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
