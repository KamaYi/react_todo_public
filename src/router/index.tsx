import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { getUserInfo } from "@/store/actions";
import Main from "@/views/layout/index";

function Router() {
  const token = false
  const role = true
  return (
    <HashRouter>
      <Switch>
        {/* <Route exact path="/login" component={Login} /> */}
        <Route
          path="/"
          render={() => {
            if (!token) {
              return <Redirect to="/login" />;
            } else {
              if (role) {
                return <Main />;
              } else {
                // getUserInfo(token).then(() => <Layout />);
              }
            }
          }}
        />
      </Switch>
    </HashRouter>
  )
}

// export default connect((state) => state.user, { getUserInfo })(Router);
export default Router