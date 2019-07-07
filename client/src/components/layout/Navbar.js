import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  handleLogOut(e){
    e.preventDefault()

    this.props.logoutUser()

  }
  

  render() {
    const { auth } = this.props
    return (
      <div className="navbar">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue accent-3">
            <Link
              to="/dashboard"
              className="brand-logo"
            >
              <i className="material-icons">code</i>
              Gifty App
            </Link>
            {auth.isAuthenticated ? 
              <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a><Link to="/dashboard">Dashboard</Link> </a></li>
              <li><a><Link to="/favorites">Favorite</Link> </a></li>
              <li><a><Link to="/history">History</Link> </a></li>
              <li><a onClick={(e) => this.handleLogOut(e)}><Link to="/history">LogOut</Link> </a></li>
            </ul> : 
            null}
            
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
