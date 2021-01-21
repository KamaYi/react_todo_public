import React, { Suspense } from 'react';
import { Layout, Breadcrumb, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getPageTitle, routeList } from '@/router/utils';
import { IRoute } from '@/router/config';
import { Scrollbars } from 'react-custom-scrollbars';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './index.less'

const LayoutContent = (props: any) => {
    console.log('props: ', props);
    const title = getPageTitle(routeList);
    // console.log('routeList: ', routeList);
    // const { role, location } = props;
    // const { pathname } = location;
    return (
        <div className="layout-content">
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={title} />
                </Helmet>
                <div className="container">
                    <Suspense fallback={<Spin className="layout__loading" />}>
                        <TransitionGroup className="transitionGroup">
                            <CSSTransition
                                // key={location.pathname}
                                timeout={500}
                                classNames="fade"
                                exit={false}
                            >
                                <Switch>
                                    <Redirect exact from="/" to="/login" />
                                    {routeList.map((menu: IRoute) => (
                                        <Route exact key={menu.path} path={menu.path} component={menu.component}></Route>
                                    ))}
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </Suspense>
                </div>
            </Scrollbars>
        </div>
    );
};
export default LayoutContent;
