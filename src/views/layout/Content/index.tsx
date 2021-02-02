import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import DocumentTitle from "react-document-title";
import { Helmet } from 'react-helmet';
import { routeList } from '@/router/utils';
import { IRoute } from '@/router/config';
import { Scrollbars } from 'react-custom-scrollbars';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Breadcrumbs from '@/components/Breadcrumb'
import config from '@/config';
import Welcome from '@/views/welcome'
import { getPageTitle } from '@/router/utils';
import { useEffect, useState } from 'react';
import { StoreState } from '@/store/types';
import { connect } from 'react-redux';
import { Settings } from '@/store/module/settings';
import './index.less'
interface LayoutContentProps {
    loadingStatus: boolean;
}
const LayoutContent = (props: LayoutContentProps) => {
    console.log('props: ', props);
    const history = useHistory()
    const [location, setLocation] = useState(history.location)
    const { pathname } = location;
    const title = getPageTitle(pathname);
    useEffect(() => {
        history.listen(loca => {
            setLocation(loca)
        })
    }, []);
    console.log('====================================');
    console.log('内容区域刷新了');
    return (
        <DocumentTitle title={title}>
            <Layout className="layout-content">
                <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                    <div className="scrollbar-content">
                        <Helmet>
                            <title>{'react-todo' + title}</title>
                            <meta name="description" content={title} />
                        </Helmet>
                        <Breadcrumbs />
                        <Spin spinning={props.loadingStatus} delay={200}>
                            <div className="scrollbar-content_container">
                            <Suspense fallback={<Spin className="layout__loading" />}>
                                <TransitionGroup className="transitionGroup">
                                    <CSSTransition
                                        timeout={500}
                                        classNames="fade"
                                        exit={false}
                                        key={location.pathname}
                                    >
                                        <Switch location={location}>
                                            <Route exact path="/" component={Welcome} />
                                            {routeList.map((route: IRoute) => (
                                                <Route exact key={config.BASENAME + route.path} path={route.path} component={route.component}></Route>
                                            ))}
                                            <Redirect to="/error/404" />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </Suspense>
                        </div>
                        </Spin>
                    </div>
                </Scrollbars>
            </Layout>
        </DocumentTitle>
    );
};
export default connect((state: StoreState) => {
    return {
        loadingStatus: state.settings.loadingStatus
    }
})(LayoutContent);
