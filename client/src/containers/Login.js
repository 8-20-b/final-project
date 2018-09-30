import React, { Component } from "react";
import { connect } from "react-redux";
import { login, userLoggedIn } from "../actions/user";
import decode from "jwt-decode";
import SignInForm from "../components/Forms/SignIn";
import { Link } from "react-router-dom";

class Login extends Component {
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
      this.props
        .login({ email, password })
        .then(res => {
          if (res.user.success) {
            localStorage.setItem("JWT", res.user.token);

            const payload = decode(res.user.token);

            const user = {
              token: res.user.token,
              userId: payload.userId
            };
            this.props.userLoggedIn(user);

            this.props.history.push("/");
          }
        })
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

    return errors;
  };

  componentWillMount = () => {
    this.props.isAuth && this.props.history.push("/");
  };

  render() {
    return (
      <div className="mt-5">
        <div className="text-center mb-5">
          <h1 className="mb-4 text-light">Sign In To Your Account</h1>
          <p className="text-muted">
            Thank you for using our service. Please enter your credentials.
          </p>
          <p>
            Not a member yet? Sign up for free!{" "}
            <Link to="/register" className="text-danger">
              Sign up for an account.
            </Link>
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 m-auto">
              <div className="bg-dark rounded p-5 text-white">
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

const mapStateToProps = state => {
  return {
    isAuth: !!state.user.token
  };
};

export default connect(
  mapStateToProps,
  { login, userLoggedIn }
)(Login);
