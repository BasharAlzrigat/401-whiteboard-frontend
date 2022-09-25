import "./App.css";
import Post from "./components/Post";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import { useCookies } from 'react-cookie';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['userCookie']);
  console.log("cookies", cookies);
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/posts"
            element={cookies?.userCookie?.token ? <Post /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
