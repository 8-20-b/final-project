import React from "react";
import { Container } from "../Login";

const LogIn = props => (
  <form>
    <div class="form-group">
      <label for="Email1">Email address</label>
      <input
        type="email"
        class="form-control"
        id="Email1"
        aria-describedby="emailHelp"
        placeholder="Email"
      />
    </div>
    <div class="form-group">
      <label for="Password">Password</label>
      <input
        type="password"
        class="form-control"
        id="Password1"
        placeholder="Password"
      />
    </div>
    <button type="submit" class="btn btn-primary">
      Submit
    </button>
  </form>
);

export default SignIn;
