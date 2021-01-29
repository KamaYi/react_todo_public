import React, { Suspense } from 'react';
import { Layout, Breadcrumb, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect,withRouter } from 'react-router-dom';
import  { routeList } from '@/router/utils';
import { IRoute } from '@/router/config';
import { Scrollbars } from 'react-custom-scrollbars';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Breadcrumbs from '@/components/Breadcrumb'
import config from '@/config';
// import { getPageTitle } from '@/router/utils';

import './index.less'

const LayoutContent = (props: any) => {
    
    // const title = getPageTitle(routeList);
    console.log('routeList: ', routeList);
    const { role, location } = props;
    const { pathname } = location;
    return (
        <div className="layout-content">
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                <div className="scrollbar-content">
                    {/* <Helmet>
                        <title>{title}</title>
                        <meta name="description" content={title} />
                    </Helmet> */}
                    <Breadcrumbs />
                    <div className="scrollbar-content_container">
                        <Suspense fallback={<Spin className="layout__loading" />}>
                            <TransitionGroup className="transitionGroup">
                                <CSSTransition
                                    timeout={500}
                                    classNames="fade"
                                    exit={false}
                                >
                                    <Switch>
                                        <Route exact path="/" to='/welcome' />
                                        {routeList.map((route: IRoute) => (
                                            <Route exact key={config.BASENAME + route.path} path={route.path} component={route.component}></Route>
                                        ))}
                                        <Redirect to="/error/404" />
                                    </Switch>
                                </CSSTransition>
                            </TransitionGroup>
                        </Suspense>
                    </div>
                </div>
            </Scrollbars>
        </div>
    );
};
export default withRouter(LayoutContent);
