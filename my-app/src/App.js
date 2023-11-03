import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Home";
import WelcomePage from "./WelcomePage";
import Signup from "./SignUp";
import Login from "./Login";

function App() {
    return (
        <BrowserRouter>

            <ToastContainer autoClose={3000} hideProgressBar />
            
            <Routes>
                <Route exact path="/" element={<WelcomePage />}></Route>
                <Route exact path="/Home" element={<Home />}></Route>
                <Route exact path="/signup" element={<Signup />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;
