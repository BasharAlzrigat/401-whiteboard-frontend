import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import base64 from 'base-64';

export default function Signin() {
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    if (e.target.username.value === "" || e.target.password.value === "") {
      return alert(
        "Error One or more fields are empty please fill them all and try again"
      );
    }

    const url = process.env.REACT_APP_BACK_END_URL;

     const username = e.target.username.value;
     const password =  e.target.password.value;
     var basicAuth = base64.encode(`${username}:${password}`);


    await axios
      .post(`${url}/signin`, {}, {
        headers: { Authorization: `Basic ${basicAuth}` }
      }).then(() => {
        navigate("/post");
      })
      .catch((err) => {
        alert("Error " + err.response.data);
      });
  };
  return (
    <div className="container w-25 mt-5 p-4 card shadow">
      <form onSubmit={(e) => handleSignin(e)}>
        <legend>Signin</legend>
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
        <button type="submit" className="btn btn-primary w-100">
          Signin
        </button>
      </form>
    </div>
  );
}
