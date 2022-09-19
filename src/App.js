import "./App.css";
import Post from "./components/Post";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/post">
          <Post />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
