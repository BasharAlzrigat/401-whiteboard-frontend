import './App.css';
import Post from './components/Post'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Signin from './components/Signin';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="/post" element={<Post />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
