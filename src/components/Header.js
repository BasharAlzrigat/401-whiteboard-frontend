/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useCookies } from "react-cookie";

export default function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["userCookie"]);
  console.log(cookies);
  const handleSignOut = () => {
    removeCookie("userCookie");
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
          {cookies?.userCookie?.token ? (
            <div className="d-flex align-items-center">
              <h6 className="mb-0 me-2">Weclome to our website</h6>
              <h3 className="mb-0 me-2">{cookies.userCookie.user.username}</h3>
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
