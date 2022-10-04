import "./App.css";
import Post from "./components/Post";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import Protect from "./components/Context";

function App() {
  return (
    <Protect>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </Protect>
  );
}

export default App;
