import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ReactApp } from './components/ReactApp';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/search'>
            <ReactApp />
        </Route>
        <Route path='*'>
          <Redirect to="/search?r=aww&n=20" />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;
