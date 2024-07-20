import React, { Component } from "react";
import { unAuthAxios } from "./AxiosConfig";
import "./ModalStyle.css";
import Modal from "react-responsive-modal";
import "bootstrap/dist/css/bootstrap.css";
import Swal from 'sweetalert2'

class LoginModal extends Component {
  state = {
    username: null,
    password: null,
  };

  // Route to log in page
  logIn = e => {
    e.preventDefault();
    this.setState(
      {
        loginInfo: {
          username: e.target.username.value,
          password: e.target.password.value,
        },
      },
      () => {
        unAuthAxios.post("/account/login/", {
          username: e.target.username.value,
          password: e.target.password.value
        })
          .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            window.location.reload();
          })
          .catch(error => {
            var errorMsg = error.response.data;
            Swal.fire(
              'Failed!',
              errorMsg,
              'error'
            )
          });
      }
    );
  };

  render() {
    return (
      <Modal
        open={this.props.openLoginModal}
        onClose={this.props.colseLoginModal}
        center
      >
        <div className="modal-log-in-body">
          <div className="modal-title">
            <h2>Login</h2>
          </div>
          <form className="contact-form login-form" onSubmit={this.logIn}>
            <div className="form-group">
              <label htmlFor="username-login" className="subtitle">
                Username:
              </label>
              <input
                maxLength={this.props.usernameMaxLength}
                className="form-input"
                type="text"
                name="username"
                id="username-login"
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-login" className="subtitle">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password-login"
                required={true}
                className="form-input"
                autoComplete="off"
              />
            </div>
            <input
              className="btn btn-md btn-primary btn-center"
              id="login_btn"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </Modal>
    );
  }
}

export default LoginModal;
