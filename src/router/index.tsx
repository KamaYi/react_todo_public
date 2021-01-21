import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "@/views/layout";
import Login from "@/views/login";
class Router extends React.Component {
    render() {
        const token = '34234'
        return (
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

export default connect((state) => state)(Router);
