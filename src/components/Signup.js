import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.confirmPassword.value) {
      return alert("Password and confirm password are not matching");
    }

    if (
      e.target.username.value === "" ||
      e.target.password.value === "" ||
      e.target.confirmPassword.value === ""
    ) {
      return alert("Error One or more fields are empty please fill them all and try again")
    }

    const url = process.env.REACT_APP_BACK_END_URL;
    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    await axios
      .post(`${url}/signup`, body)
      .then((result) => {
        navigate("/signin")
      })
      .catch((err) => {
        console.log("error");
      });
  };
  return (
    <div className="container w-25 mt-5 p-4 card shadow">
      <form onSubmit={(e) => handleSignUp(e)}>
        <legend>Signup</legend>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>
      </form>
    </div>
  );
}
