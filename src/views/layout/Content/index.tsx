import React, { Suspense } from 'react';
import { Layout, Breadcrumb, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { getPageTitle, routeList } from '@/router/utils';
import { IRoute } from '@/router/config';
import './index.less'

const LayoutContent = () => {
    const title = getPageTitle(routeList);
    console.log('routeList: ', routeList);
    const { Content } = Layout;
    return (
        <Content
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
        >   <Helmet>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Helmet>
            <div className="container">
                <div className="content">
                    asdasdasd
                    <Suspense fallback={<Spin className="layout__loading" />}>
                        <Switch>
                            {routeList.map((menu: IRoute) => (
                                <Route exact key={menu.path} path={menu.path} component={menu.component}></Route>
                            ))}
                        </Switch>
                    </Suspense>
                </div>
            </div>
        </Content>
    );
};
export default LayoutContent;
