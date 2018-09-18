import React, { Component, Fragment } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Data/store";
import Courses from "./Containers/Courses";
import UserCourses from "./Containers/UserCourses";
import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Fragment>
            <Route exact path="/" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/courses" component={ Courses } />
            <Route exact path="/course" component={ Course } />
          </Fragment>
        </Provider>
      </Router>
    );
  }
}

export default App;
          // <Course />
