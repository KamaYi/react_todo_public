import React, { Suspense } from 'react';
import { Layout, Breadcrumb, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { getPageTitle, routeList } from '@/router/utils';
import { IRoute } from '@/router/config';
import { Scrollbars } from 'react-custom-scrollbars';
import './index.less'

const LayoutContent = () => {
    const title = getPageTitle(routeList);
    console.log('routeList: ', routeList);
    return (
        <div className="layout-content">
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={title} />
                </Helmet>
                <div className="container">
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    <span>asdasdasd</span>
                    asdasdasd
                    <Suspense fallback={<Spin className="layout__loading" />}>
                        <Switch>
                            {routeList.map((menu: IRoute) => (
                                <Route exact key={menu.path} path={menu.path} component={menu.component}></Route>
                            ))}
                        </Switch>
                    </Suspense>
                </div>
            </Scrollbars>
        </div>
    );
};
export default LayoutContent;
