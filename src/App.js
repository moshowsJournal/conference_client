import React from 'react';
import logo from './logo.svg';
import {AddTalk,Header,AddAttendees,AddAttendeeToList} from './MainComponents';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
          <Header />
          <Switch>
              <Route exact="/" path="/" component={AddTalk} />
              <Route exact="/add_attendees" path="/add_attendees" component={AddAttendees}/>
              <Route path={`/add_attendee_talks/:talk_id`} component={AddAttendeeToList} />
          </Switch>
    </Router>
  );
}

export default App;
