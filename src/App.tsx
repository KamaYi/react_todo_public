import React, { Suspense } from 'react';
import { Spin, ConfigProvider } from 'antd';
import Router from './router';
import zhCN from "antd/es/locale/zh_CN";
import { Provider } from 'react-redux';
import ReactWatermark from 'react-watermark-module'
import store from './store';

import '@/assets/less/index.less';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Suspense fallback={<Spin size="large" className="layout__loading" />}>
          <ReactWatermark
            imagePath={''} //必须，对象，背景图片
            textData={'dasasdasdasdasdasdasdasdasdasd'} //必须，字符串，水印内容
            type={'text'} //必须，水印类型
          />
          <Router />
        </Suspense>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
