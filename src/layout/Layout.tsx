import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, Link } from 'react-router-dom';
import { Spin, Result, Button, Layout } from 'antd';
import { getPageTitle, systemRouteList } from '@/router/utils';
import { IRoute } from '@/router/config';
import './layout.less';

interface LayoutState {
  isError: boolean;
}

class AdminLayout extends React.PureComponent<any, LayoutState> {
  state: LayoutState = {
    isError: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch() {
    // 上报错误
  }

  render() {
    if (this.state.isError) {
      return (
        <Result
          status="warning"
          title="系统错误，请联系管理员"
          extra={
            <Button type="primary" key="console">
              Go Contact
            </Button>
          }
        />
      );
    }

    const title = getPageTitle(systemRouteList);
    console.log('====================================');
    console.log(systemRouteList);
    console.log('====================================');
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

        <div className="container">
          <div className="content">
            <Suspense fallback={<Spin className="layout__loading" />}>
              <Switch>
                {systemRouteList.map((menu: IRoute) => (
                  <Route exact key={menu.path} path={menu.path} component={menu.component}></Route>
                ))}
              </Switch>
            </Suspense>
          </div>
        </div>
      </>
    );
  }
}

export default AdminLayout;
