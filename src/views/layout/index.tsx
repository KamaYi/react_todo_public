import React from 'react';
import { Layout, Result } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Content from "./Content";
import Header from "./Header";
import Sider from "./Sider";
interface LayoutState {
  hasError: boolean;
}

class LayoutView extends React.PureComponent<any, LayoutState> {
  state: LayoutState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error)
    console.log(info)
    // 上报错误
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="warning"
          title="系统错误"
        />
      );
    }
    return (
      <Layout style={{ height: '100vh' }}>
        <BrowserRouter>
          <Switch>
            <Route>
              <Header />
            </Route>
            <Layout>
              <Sider />
              <Content />
            </Layout>
          </Switch>
        </BrowserRouter>
      </Layout>
    );
  }
}

export default LayoutView;
