import React, { Component } from "react";
import axios from "axios";
import SignInForm from "../components/Forms/SignIn";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const errors = this.validate({ email, password });
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:7777/v1/auth", { email, password })
        .then(user => {
          if (user.data.success) {
            console.log("user success", user.data);

            localStorage.setItem("JWT", user.data.token);
            this.props.history.push("/");
          } else {
            console.log("user Error", user.data);
          }
        });
    }
  };

  validate = data => {
    const errors = {};

    !data.email ? (errors.email = "Enter your email address.") : "";
    !data.password ? (errors.password = "Enter your password.") : "";

    return errors;
  };

  componentWillMount = () => {
    if (localStorage.getItem("JWT")) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="mt-5">
        <h1 className="text-center">User Authentication</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-7 m-auto">
              <div className="bg-info p-5 text-white">
                <SignInForm
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  errors={this.state.errors}
                  email={this.state.email}
                  password={this.state.password}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
