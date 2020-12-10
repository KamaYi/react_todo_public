import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { IRoute } from './router/config';
// import { layoutRouteList } from './router/utils';
import config from './config';

import './styles/index.less';

function App() {
  return (
    <Router>
    <Route path="/" component={App}>
      {/* 当 url 为/时渲染 Dashboard */}
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
  );
}

export default App;
