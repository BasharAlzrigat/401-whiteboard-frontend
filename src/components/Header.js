/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ListContext } from "./Context";

export default function Header() {
  const navigate = useNavigate();
  const { loggedIn, userData, logout } = useContext(ListContext);
  const handleSignOut = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <ul className="d-flex justify-content-between">
        <li>
          <a className="active" href="/posts">
            Posts
          </a>
        </li>
        <li>
          {loggedIn ? (
            <div className="d-flex align-items-center">
              <h6 className="mb-0 me-2">Weclome to our website</h6>
              <h3 className="mb-0 me-2">{userData?.userInfo?.username}</h3>
              <a href="#" onClick={handleSignOut}>
                Logout
              </a>
            </div>
          ) : (
            <a href="/">Login</a>
          )}
        </li>
      </ul>
    </div>
  );
}
