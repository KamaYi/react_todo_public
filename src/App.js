import React, { Component } from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from "antd";
import Router from "./router";


class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    );
  }
}

export default App;
