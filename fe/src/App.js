import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateUser from "./components/createUser";
import EditUser from "./components/editUser";
import UserList from "./components/userList";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">          
          <nav className="navbar navbar-expand-lg ">
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">User List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create user</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={UserList} />
          <Route path="/edit/:id" component={EditUser} />
          <Route path="/create" component={CreateUser} />
        </div>
      </Router>
    );
  }
}

export default App;
