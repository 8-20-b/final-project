import React, { Component } from "react";
import SignUpForm from '../components/Forms/SignUp';

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    errors: {}
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {email, password, password2} = this.state
    const errors = this.validate({email, password, password2});
    this.setState({errors});

    console.log('Submitted...')
  }

  validate = data => {
    
    const errors = {};
    
    !data.email ? errors.email = "Enter your email address." : "";
    !data.password ? errors.password = "Enter your password." : "";
    data.password !== data.password2 ? errors.password = "Your passwords doesn't match." : "";
    
    console.log('data', errors);
    return errors;
  }

  render() {
    console.log('errors', this.state.errors)
    return (
      <div className="mt-5">
        <h1 className="text-center">Registration page</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-7 m-auto">
              <div className="bg-info p-5 text-white">
              <SignUpForm onChange={this.handleChange} onSubmit={this.handleSubmit} errors={this.state.errors} email={this.state.email} password={this.state.password} password2={this.state.password2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
