import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Converter from './components/Converter';
import NotFound from './components/NotFound';

// redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Converter} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
