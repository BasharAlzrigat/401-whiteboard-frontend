import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
  return (
    <div className="container w-25 mt-5 ">
    <div className="d-flex flex-column justify-content-center p-4 card shadow">
        <p>Hello there, welcome to our website Signin and start posting and commenting right away!</p>
        <p>Does not have account? dont worry you can Signup <a className="mb-0" href="/signup">here</a> </p>
        <div className="d-flex flex-column justify-content-center gap-4">
      <button onClick={()=>navigate("/signin")} type="button" class="btn btn-primary btn-lg btn-block">
        Signin
      </button>
      <button onClick={()=>navigate("/signup")} type="button" class="btn btn-secondary btn-lg btn-block">
        Signup
      </button>
      </div>
    </div>
    </div>
  );
}
