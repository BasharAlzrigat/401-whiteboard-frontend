import React, { useState } from "react";
import axios from "axios";
import base64 from "base-64";
// import { useCookies } from "react-cookie";
export const ListContext = React.createContext();

function Protect(props) {
//   const [cookies, setCookie, removeCookie] = useCookies(["userCookie"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState("");
  const url = process.env.REACT_APP_BACK_END_URL;

  const canDo = (action) => {
    const actions={
        getPosts: "read",
        addPost: "create",
        getComments: "read",
        addComment: "read",
        deletePost: "delete",
        updatePost: "update"
    }
    if(userData?.userPermission?.includes(actions[action])) return true;
    return false;
  };

  const login = async (username, password) => {
    const basicAuth = base64.encode(`${username}:${password}`);
    await axios
      .post(
        `${url}/signin`,
        {},
        {
          headers: { Authorization: `Basic ${basicAuth}` },
        }
      )
      .then((result) => {
        setUserData({userInfo: result.data.user, userPermission: result.data.user.capabilities});
        setToken(result.data.token);
        setLoggedIn(true);
        console.log("result.data", result.data);
        return true;
      })
      .catch((err) => {
        alert("Error " + err.response.data);
        return false;
      });
  };

  const logout = () => {
    setUserData({});
    setToken("");
    setLoggedIn(false);
  }

  return (
    <ListContext.Provider
      value={{
        token,
        userData,
        loggedIn,
        canDo,
        login,
        logout,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
}

export default Protect;
