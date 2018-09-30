import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../actions/user";
import SignUpForm from "../components/Forms/SignUp";
import { Link } from "react-router-dom";

class Register extends Component {
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
    const errors = this.validate({
      email,
      password,
      password2
    });
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.props
        .signup({ email, password })
        .then(res => res.user.success && this.props.history.push("/login"))
        .catch(err =>
          this.setState({
            errors: { ...this.state.errors, global: err.message }
          })
        );
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
    this.props.isAuth && this.props.history.push("/");
  };

  render() {
    return (
      <div className="mt-5">
        <div className="text-center mb-5">
          <h1 className="mb-4 text-light">Sign Up... It's Free!</h1>
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

const mapStateToProps = state => {
  return {
    isAuth: !!state.user.token
  };
};

export default connect(
  mapStateToProps,
  { signup }
)(Register);
