import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "@/views/layout";
import Login from "@/views/login";
import { StoreState } from '@/store/types';
import watermark from '@/router/utils'

interface RouteProps {
    token: string
}
class Router extends React.Component {

    render() {
        const { token } = this.props as RouteProps;
        watermark({
            content: '水印内容',
            container: document.querySelector('#root') as any
        })
        return ( // 处理未登陆状态能访问的页面
            <HashRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route
                        path="/"
                        render={() => {
                            if (!token) {
                                return <Redirect to="/login" />;
                            } else {
                                return <Layout />;
                            }
                        }}
                    />
                </Switch>
            </HashRouter>
        );
    }
}

export default connect((state: StoreState) => {
    return {
        token: state.user.token
    }
})(Router);
