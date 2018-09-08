import React from 'react';

const SignUp = props => (
<form>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" name="email" id="email" onChange={props.onChange} value={props.email} />
  </div>
  <div className="form-group">
    <label htmlFor="password1">Password</label>
    <input type="password" className="form-control" name="password" id="password1"  onChange={props.onChange} value={props.password} />
  </div>
  <div className="form-group">
    <label htmlFor="password2">Confirm password</label>
    <input type="password" className="form-control" name="password2" id="password2"  onChange={props.onChange} value={props.password2} />
  </div>
  <button onClick={props.onSubmit} className="btn btn-primary">Sign Up</button>
</form>
);

export default SignUp;