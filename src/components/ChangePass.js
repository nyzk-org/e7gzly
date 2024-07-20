import React, { Component } from "react";
import { authAxios } from "./AxiosConfig";
import "./ModalStyle.css";
import Modal from "react-responsive-modal";
import "bootstrap/dist/css/bootstrap.css";
import Swal from 'sweetalert2'
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ChangePass extends Component {
  state = {
    isPasswordMatch: true,
    oldPassword: null,
    newPassword: null,
    confirmPass:null,
  };

 

  // Route to log in page
  ChangePass = e => {
    e.preventDefault();
    if(this.state.isPasswordMatch){
    authAxios.patch("user/", {
      old_password: this.state.oldPassword,
      new_password: this.state.newPassword  
    })
      .then(response => {
        Swal.fire("Password changed successfully ", '', 'success')
        this.props.colsechangepasswordModal()
      })
      .catch(error => {
        var errorMsg = error.response.data.old_password;
        console.log(errorMsg)
        Swal.fire('Failed!',
          errorMsg[0],
          'error'
        )
      });
    }
    else {
      Swal.fire("confirm your password");
    }
  };
handleChangePass=({target})=>{
  this.setState({
    newPassword:target.value
  });

  if (  this.state.confirmPass !== target.value) {
    this.setState({ isPasswordMatch: false });
  } else {
    this.setState({ isPasswordMatch: true });
  }
}
checkConfirmPassword = ({target}) => {
  this.setState({
    confirmPass:target.value
  });
  if (  target.value !== this.state.newPassword) {
    this.setState({ isPasswordMatch: false });
  } else {
    this.setState({ isPasswordMatch: true });
  }
};

handleChangeOldPass=({target})=>{

  this.setState({
    oldPassword:target.value
  })
}
  render() {
    return (
      <Modal open={this.props.openchangepasswordModal} onClose={this.props.colsechangepasswordModal} center >
        <div className="modal-log-in-body">
          <div className="modal-title">
            <h2>Change Password</h2>
          </div>
          <form className="contact-form changepassword-form" onSubmit={this.ChangePass}>
            <div className="form-group">
              <label htmlFor="username-changepassword" className="subtitle">Old Password:</label>
              <input type="password" name="password" id="password-sign" className="form-input" onChange={this.handleChangeOldPass} autoComplete="off" required={true}/>
            </div>
            <div className="form-group">
              <label htmlFor="password-sign" className="subtitle">Password*:</label>
              <input type="password" name="password" id="password-sign" className="form-input" onChange={this.handleChangePass} autoComplete="off" required={true}/>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password" className="subtitle">Confirm Password*:</label>
              <input type="password" name="confirmPassword" id="confirm-password"className="form-input" onChange={this.checkConfirmPassword}autoComplete="off"aria-required={true}required={true}/>
              {this.state.isPasswordMatch ? null : (<p id="password-error-msg">{" "}<FontAwesomeIcon icon={faTimesCircle} size="xs" />{" "}password does not match</p>)}
            </div>
            <input className="btn btn-md btn-primary btn-center" id="changepassword_btn" type="submit" value="Change"/>
          </form>
        </div>
      </Modal>
    );
  }
}

export default ChangePass;
