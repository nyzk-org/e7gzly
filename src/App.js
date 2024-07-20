import React, { Component } from "react";
import Home from "./components/Home";
import MatchReservation from "./components/MatchReservation";
import AdminDashboard from "./components/AdminDashboard";
import { Router, Route, Switch } from "react-router-dom";
import history from './components/history';
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import NewMatch from "./components/NewMatch";
import NewStadium from "./components/NewStadium";
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <div className="App">
            <Route exact path="/" component={Home} />
            <Route exact path="/newmatch:match_id" component={NewMatch}/>
            <Route exact path="/newstadium" component={NewStadium}/>
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/match:match_id" component={MatchReservation} />
            <ProtectedRoute exact path="/admin" component={AdminDashboard} />
          </div>
        </Switch>
      </Router>
    );
    // return (
    //   <div className="App">
    //     {/* <AdminDashboard /> */}
    //     <MatchReservation />
    //   </div>
    // );
  }
}

export default App;
