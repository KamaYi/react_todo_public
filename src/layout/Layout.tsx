import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { Spin, Result } from 'antd';
import { getPageTitle, systemRouteList } from '@/router/utils';
import { IRoute } from '@/router/config';
import './layout.less';
interface LayoutState {
  hasError: boolean;
}

class Layout extends React.PureComponent<any, LayoutState> {
  state: LayoutState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any,info: any) {
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

    const title = getPageTitle(systemRouteList);
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

export default Layout;
