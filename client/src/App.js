import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Favorites from "./components/favorite/Favorite";
import History from "./components/history/History";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  console.log(decoded);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/history" component={History} />
              <PrivateRoute exact path="/favorites" component={Favorites} />
            </Switch>
          </div>
        </Router>
      </Provider>   
    );
  }
}

export default App;
