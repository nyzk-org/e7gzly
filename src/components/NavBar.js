import React, { Component } from "react";
import LoginModal from "./LoginModal"
import SignUpModal from "./SignUpModal"
import "./NavBar.css";
import logo from "../assets/logo.png";

const USERNAME_MAX_LENGTH = 50;

class NavBar extends Component {
  state = {
    sign: false,  // Open sign up modal
    login: false, // Open login modal
  };

  openSignModal = () => {
    this.setState({ sign: true });
  };

  openLoginModal = () => {
    this.setState({ login: true });
  };

  closeSignModal = () => {
    this.setState({ sign: false });
  };

  colseLoginModal = () => {
    this.setState({ login: false });
  };
 
  signOut = () => {
    localStorage.clear()
    window.location.href = '/'
  };

  
  render() {
    const user = localStorage.getItem('role') !== null ? localStorage.getItem('role') : 'guest' // Get the user role
    const login = this.state.login;
    const sign = this.state.sign;
    return (
      <>
        <div className="nav-bar">
          <div className="left-side">
            <a href="/">
              <img className="logo" src={logo} alt="logo" height="60px"></img>
              <p id="title"> E7GZLY </p>
            </a>
          </div>
          <div className="right-side">
            <div className="links">
              <a href="/"> Home </a>
              {user !== 'guest' ? (
                <a href="/profile"> Profile </a>
              ) : (
                <>
                  <button
                    className="sign-in-up-buttons"
                    onClick={this.openLoginModal}
                  >
                    Log In
                  </button>
                  <button
                    className="sign-in-up-buttons"
                    onClick={this.openSignModal}
                  >
                    Sign Up
                  </button>
                </>
              )}
              {((user === 'manager')||(user==='admin'))? <a href="/newmatch:0"> Add New Match </a> : null}
              {((user === 'manager')||(user==='admin'))? <a href="/newstadium"> Add New Stadium </a> : null}
              {user === 'admin' ? (
                <a href="/admin"> Approve/Remove Users </a>
              ) : null}
              {user !== 'guest' ? (
                <button className="sign-in-up-buttons" onClick={this.signOut}>
                  Sign Out
                </button>
              ) : null}
            </div>
          </div>
        </div>
        {/* Login modal */}
        <LoginModal openLoginModal={login} colseLoginModal={this.colseLoginModal} usernameMaxLength={USERNAME_MAX_LENGTH}/>
        {/*<!-- sign up modal--> */}
        <SignUpModal openSignModal={sign} closeSignModal={this.closeSignModal} usernameMaxLength={USERNAME_MAX_LENGTH}/>
      </>
    );
  }
}

export default NavBar;
