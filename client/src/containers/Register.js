import React, { Component } from "react";
import axios from "axios";
import SignUpForm from "../components/Forms/SignUp";
import { Link } from "react-router-dom";
import { API_ROOT } from "../services/api-config";

console.log("API_ROOT ", API_ROOT);

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password, password2 } = this.state;
    const errors = this.validate({ email, password, password2 });
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      axios.post(`${API_ROOT}/signup`, { email, password }).then(user => {
        if (user.data.success) {
          this.props.history.push("/login");
        } else {
          this.setState({
            errors: { ...this.state.errors, global: user.data.message }
          });
        }
      });
    }
  };

  validate = data => {
    const errors = {};

    if (!data.email) errors.email = "Enter your email address.";
    if (!data.password) errors.password = "Enter your password.";
    if (data.password !== data.password2)
      errors.password = "Your passwords don't match.";

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
        <div className="text-center mb-5">
          <h1 className="mb-4 text-danger">Sign Up... It's Free!</h1>
          <p className="text-muted">
            Easily sign up to our community and enjoy multiple benefits we offer
            for members.
          </p>
          <p>
            Already a member?{" "}
            <Link to="/login" className="text-danger">
              Sign in to your account.
            </Link>
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 m-auto">
              <div className="bg-dark rounded p-5 text-white">
                <SignUpForm
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  errors={this.state.errors}
                  email={this.state.email}
                  password={this.state.password}
                  password2={this.state.password2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
