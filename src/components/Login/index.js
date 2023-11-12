import React, { Component } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class LoginForm extends Component {
  state = {
    isPasswordType: true,
    usernameInputValue: "",
    passwordInputValue: "",
  };

  onTogglePassword = () => {
    this.setState((prevState) => ({
      isPasswordType: !prevState.isPasswordType,
    }));
  };

  onChangePassword = (e) => {
    this.setState({ passwordInputValue: e.target.value });
  };

  onChangeUsername = (e) => {
    this.setState({ usernameInputValue: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { passwordInputValue, usernameInputValue } = this.state;
    if (
      passwordInputValue === "2000@" &&
      usernameInputValue === "balajikosuri"
    ) {
      this.setState({ usernameInputValue: "", passwordInputValue: "" });

      Cookies.set("pass_key", "qwertyuiop", {
        expires: 30,
      });
      return <Navigate replace to="/" />;
    } else {
      alert("Invalid Password !");
    }
  };

  render() {
    const { isPasswordType, passwordInputValue, usernameInputValue } =
      this.state;
    const passKey = Cookies.get("pass_key");
    return (
      <div className="LoginForm-responsive">
        <div className="LoginForm">
          <form onSubmit={(e) => this.onSubmit(e)}>
            <h1>Please Login</h1>
            <div className="form-group">
              <label className="custom-label" htmlFor="username">
                Username :
              </label>
              <br />
              <input
                className="inputField"
                value={usernameInputValue}
                id="username"
                placeholder="Please Enter Username"
                type="text"
                required
                onChange={(e) => this.onChangeUsername(e)}
              />
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="password">
                Password :
              </label>
              <br />
              <input
                value={passwordInputValue}
                className="inputField"
                placeholder="Please Enter Username"
                type={isPasswordType ? "password" : "text"}
                id="password"
                required
                onChange={(e) => this.onChangePassword(e)}
              />
            </div>
            <div className="toggle-password-container">
              <input type="checkbox" onChange={this.onTogglePassword} />
              <label htmlFor="toggle-password">Show Password</label>
            </div>
            <div className="form-group">
              <Link to="/">
                <button type="submit" className="login-btn">
                  Login
                </button>
              </Link>
            </div>
            <details className="Credentials">
              <summary>username & password</summary>
              <h5>
                Username: <span>balajikosuri</span>
              </h5>
              <h5>
                Password: <span>2000@</span>
              </h5>
            </details>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
