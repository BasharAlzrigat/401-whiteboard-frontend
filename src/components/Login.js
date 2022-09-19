import React from "react";

export default function Login() {
  return (
    <div className="container w-25 mt-5 ">
    <div className="d-flex flex-column justify-content-center p-4 card shadow">
        <p>Hello there, welcome to our website Signin and start posting and commenting right away!</p>
        <p>Does not have account? dont worry you can Signup <a className="mb-0" href="/signup">here</a> </p>
        <div className="d-flex flex-column justify-content-center gap-4">
      <a href="/signin" class="btn btn-primary btn-lg btn-block">
        Signin
      </a>
      <a href="/signup" class="btn btn-secondary btn-lg btn-block">
        Signup
      </a>
      </div>
    </div>
    </div>
  );
}
