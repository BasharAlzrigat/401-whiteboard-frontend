import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import base64 from 'base-64';
import { useCookies } from 'react-cookie';

export default function Signin({cookie}) {
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    if (e.target.username.value === "" || e.target.password.value === "") {
      return alert(
        "Error One or more fields are empty please fill them all and try again"
      );
    }

    const url = process.env.REACT_APP_BACK_END_URL;

     const username = e.target.username.value.toLowerCase();
     const password =  e.target.password.value;
     const basicAuth = base64.encode(`${username}:${password}`);

     console.log("basicAuth", basicAuth);


    await axios
      .post(`${url}/signin`, {}, {
        headers: { Authorization: `Basic ${basicAuth}` }
      }).then((result) => {
        setCookie('userCookie', result.data, { path: '/' })
        console.log("result.data", result.data);
        navigate("/posts");
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
