import React from "react";

const SignUp = props => (
  <form>
    {!!props.errors.global && (
      <div class="alert alert-danger">{props.errors.global}</div>
    )}
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input
        type="email"
        className="form-control"
        name="email"
        id="email"
        onChange={props.onChange}
        value={props.email}
      />
      {!!props.errors.email && (
        <small className="text-danger">{props.errors.email}</small>
      )}
    </div>
    <div className="form-group">
      <label htmlFor="password1">Password</label>
      <input
        type="password"
        className="form-control"
        name="password"
        id="password1"
        onChange={props.onChange}
        value={props.password}
      />
      {!!props.errors.password && (
        <small className="text-danger">{props.errors.password}</small>
      )}
    </div>
    <div className="form-group">
      <label htmlFor="password2">Confirm password</label>
      <input
        type="password"
        className="form-control"
        name="password2"
        id="password2"
        onChange={props.onChange}
        value={props.password2}
      />
    </div>
    <button onClick={props.onSubmit} className="mt-4 btn btn-danger">
      Sign Up
    </button>
  </form>
);

export default SignUp;
