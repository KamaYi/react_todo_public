import React from 'react';
import Router from "./router";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { Provider } from "react-redux";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      {/* <Provider store={store}> */}
        <Router />
      {/* </Provider> */}
    </ConfigProvider>
  );
}

export default App;
