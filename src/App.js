import React from 'react';
import logo from './logo.svg';
import {AddTalk,Header} from './MainComponents';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
          <Header />
          <Switch>
              <AddTalk exact="/add_talk" path="/add_talk" />
          </Switch>
    </Router>
  );
}

export default App;
