import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import Layout from "@/views/layout";
import Login from "@/views/login";
class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            path="/"
            render={() => {
              return <Layout />;
            }}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default Router;
