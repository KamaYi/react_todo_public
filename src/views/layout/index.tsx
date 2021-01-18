import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout, Result } from 'antd';
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
      <Layout style={{height: '100vh'}}>
        <Header />
        <Layout style={{ marginTop: 64 }}>
          <Sider />
          <Content />
        </Layout>
      </Layout>
    );
  }
}

export default LayoutView;
