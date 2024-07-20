import React, { Component } from "react";
import { unAuthAxios } from "./AxiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-responsive-modal";
import "bootstrap/dist/css/bootstrap.css";
import "./ModalStyle.css";
import Swal from 'sweetalert2'

const CITIES = [
  { key: "cairo", value: "Cairo" },
  { key: "alexandria", value: "Alexandria" },
  { key: "giza", value: "Giza" },
  { key: "shubra el-kheima", value: "Shubra El-Kheima" },
  { key: "port said", value: "Port Said" },
  { key: "suez", value: "Suez" },
  { key: "luxor", value: "Luxor" },
  { key: "al-mansura", value: "Al-Mansura" },
  { key: "el-mahalla el-kubra", value: "El-Mahalla El-Kubra" },
  { key: "tanta", value: "Tanta" },
  { key: "asyut", value: "Asyut" },
  { key: "ismailia", value: "Ismailia" },
  { key: "fayyum", value: "Fayyum" },
  { key: "zagazig", value: "Zagazig" },
  { key: "aswan", value: "Aswan" },
  { key: "damietta", value: "Damietta" },
  { key: "damanhur", value: "Damanhur" },
  { key: "al-minya", value: "Al-Minya" },
  { key: "beni suef", value: "Beni Suef" },
  { key: "qena", value: "Qena" },
  { key: "sohag", value: "Sohag" },
  { key: "hurghada", value: "Hurghada" },
  { key: "6th of october city", value: "6th of October City" },
  { key: "shibin el kom", value: "Shibin El Kom" },
  { key: "banha", value: "Banha" },
  { key: "kafr el-sheikh", value: "Kafr el-Sheikh" },
  { key: "arish", value: "Arish" },
  { key: "mallawi", value: "Mallawi" },
  { key: "10th of ramadan city", value: "10th of Ramadan City" },
  { key: "bilbais", value: "Bilbais" },
  { key: "marsa matruh", value: "Marsa Matruh" },
  { key: "idfu", value: "Idfu" },
  { key: "mit ghamr", value: "Mit Ghamr" },
  { key: "al-hamidiyya", value: "Al-Hamidiyya" },
  { key: "desouk", value: "Desouk" },
  { key: "qalyub", value: "Qalyub" },
  { key: "abu kabir", value: "Abu Kabir" },
  { key: "kafr el-dawwar", value: "Kafr el-Dawwar" },
  { key: "girga", value: "Girga" },
  { key: "akhmim", value: "Akhmim" },
  { key: "matareya", value: "Matareya" },
];

class SignUpModal extends Component {
  state = {
    isPasswordMatch: true, // To check for password and confirm password match or not in sign up modal
    registrationInfo: {
      // Info for registration
      username: null,
      password: null,
      firstName: null,
      lastName: null,
      birthDate: null,
      gender: null,
      city: null,
      address: null,
      email: null,
      role: null,
    },
  };

  // Request to sign up
  signUp = e => {
    e.preventDefault();
    this.setState(
      {
        registrationInfo: {
          username: e.target.username.value,
          password: e.target.password.value,
          confirmPassword: e.target.confirmPassword.value,
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          birthDate: e.target.birthDate.value,
          gender: e.target.gender.value,
          city: e.target.city.value,
          address: e.target.address.value,
          email: e.target.email.value,
          role: e.target.role.value,
        },
      },
      () => {
        var birthDate = new Date(this.state.registrationInfo.birthDate);
        var currentDate = new Date();
        var age = new Date(currentDate - birthDate).getFullYear();
        if (
          this.state.registrationInfo.password !==
          this.state.registrationInfo.confirmPassword
        ) {
          alert("Password and confirm password doesn't match");
        } else if (age - 1970 < 16) {
          alert("You must be (+16) to create an account");
        } else {
          unAuthAxios.post("/account/registration/", {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            birthdate: e.target.birthDate.value,
            gender: e.target.gender.value,
            city: e.target.city.value,
            address:
              e.target.address.value !== "" ? e.target.address.value : null,
            role: e.target.role.value,
          })
            .then(response => {
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('role', response.data.role)
              Swal.fire({
                icon: 'success',
                title:'Account Created Successfully',
                showConfirmButton: false,
                timer: 1500
              }
              ).then((result) => {
                if (result.isDismissed){
                  window.location.reload()
                }
              })
              
            })
            .catch(error => {
              var errorData = error.response.data;
              var errorMsg = "";
              for (var key in errorData) {
                if (errorData.hasOwnProperty(key)) {
                  errorMsg += key + ": " + errorData[key] + "\n";
                }
              }
              Swal.fire(
                'Failed!',
                errorMsg,
                'error'
              )
            });
        }
      }
    );
  };

  // To check if password and confirm password match or not
  checkConfirmPassword = e => {
    if (
      e.target.value !== document.getElementById("sign-form")["password"].value
    ) {
      this.setState({ isPasswordMatch: false });
    } else {
      this.setState({ isPasswordMatch: true });
    }
  };

  // To check if password and confirm password match or not
  checkPassword = e => {
    if (
      e.target.value ===
      document.getElementById("sign-form")["confirmPassword"].value
    ) {
      this.setState({ isPasswordMatch: true });
    }
  };

  render() {
    return (
      <Modal
        open={this.props.openSignModal}
        onClose={this.props.closeSignModal}
        center
      >
        <div className="modal-sign-body">
          <div className="modal-title">
            <h2>Sign Up</h2>
          </div>
          <form
            className="contact-form sign-form"
            id="sign-form"
            onSubmit={this.signUp}
          >
            <div className="container">
              <div className="row">
                <div className="col-md">
                  <div className="form-group">
                    <label htmlFor="username-sign" className="subtitle">
                      Username*:
                    </label>
                    <input
                      maxLength={this.props.maxUserNameLength}
                      className="form-input"
                      id="username-sign"
                      type="text"
                      name="username"
                      required={true}
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password-sign" className="subtitle">
                      Password*:
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password-sign"
                      className="form-input"
                      onChange={this.checkPassword}
                      autoComplete="off"
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password" className="subtitle">
                      Confirm Password*:
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirm-password"
                      className="form-input"
                      onChange={this.checkConfirmPassword}
                      autoComplete="off"
                      aria-required={true}
                      required={true}
                    />
                    {this.state.isPasswordMatch ? null : (
                      <p id="password-error-msg">
                        {" "}
                        <FontAwesomeIcon icon={faTimesCircle} size="xs" />{" "}
                        password does not match
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="subtitle">
                      Email Address*:
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="birth" className="subtitle">
                      Birth Date*:
                    </label>
                    <input
                      className="form-input"
                      type="date"
                      id="date-input"
                      name="birthDate"
                      required={true}
                      min="1900-01-01"
                    ></input>
                  </div>
                  <label htmlFor="gender-radio" className="subtitle">
                    Gender*:
                  </label>
                  <br></br>
                  <div id="htmlFor" className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      id="male-radio"
                      type="radio"
                      name="gender"
                      value="male"
                      required={true}
                    />
                    <label className="form-check-label" htmlFor="male-radio">
                      Male
                    </label>
                    <input
                      className="form-check-input"
                      id="female-radio"
                      type="radio"
                      name="gender"
                      value="female"
                      required={true}
                    />
                    <label className="form-check-label" htmlFor="female-radio">
                      Female
                    </label>
                    <input
                      className="form-check-input"
                      id="other-radio"
                      type="radio"
                      name="gender"
                      value="other"
                      required={true}
                    />
                    <label className="form-check-label" htmlFor="other-radio">
                      Other
                    </label>
                  </div>
                </div>
                <div className="vl"></div>
                <div className="col-md">
                  <div className="form-group">
                    <label htmlFor="first-name" className="subtitle">
                      First Name*:
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      name="firstName"
                      id="first-name"
                      autoComplete="off"
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last-name" className="subtitle">
                      Last Name*:
                    </label>
                    <input
                      className="form-input"
                      id="last-name"
                      type="text"
                      name="lastName"
                      autoComplete="off"
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address" className="subtitle">
                      Address:
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="off"
                      aria-required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city" className="subtitle">
                      City*:
                    </label>
                    <select name="city" id="city" className="form-input">
                      {CITIES.map(city => (
                        <option key={city.key} value={city.key}>
                          {city.value}
                        </option>
                      ))}
                      ;
                    </select>
                  </div>
                  <label htmlFor="role-radio" className="subtitle">
                    Role*:
                  </label>
                  <br></br>
                  <div className="form-check form-check-inline" id="role-radio">
                    <input
                      className="form-check-input"
                      id="fan-radio"
                      type="radio"
                      name="role"
                      value="fan"
                      required={true}
                    />
                    <label className="form-check-label" htmlFor="fan-radio">
                      Fan
                    </label>
                    <input
                      className="form-check-input"
                      id="manager-radio"
                      type="radio"
                      name="role"
                      value="manager"
                      required={true}
                    />
                    <label className="form-check-label" htmlFor="manager-radio">
                      Manager
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <input
              className="btn btn-md btn-primary btn-center"
              id="sign_up"
              type="submit"
              value="Sign Up"
            />
          </form>
        </div>
      </Modal>
    );
  }
}

export default SignUpModal;
