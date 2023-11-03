import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountLoginForm = (options) => {
  const [res, setRes] = useState({
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [login, setLogin] = useState("");

  useEffect(() => {
    if (login) {
      localStorage.setItem("token", res.username);
      return navigate("/Home", { state: { username: res.username } });
    }
  });

  const handleUsernameChange = (event) => {
    event.persist();
    setRes((res) => ({
      ...res,
      username: event.target.value,
    }));
  };

  const handlePasswordChange = (event) => {
    event.persist();
    setRes((res) => ({
      ...res,
      password: event.target.value,
    }));
  };

  //once the button is clicked; it called this processSubmit function
  const processSubmit = async () => {
    //check data

    if (options.formType === "login") {
      try {
        const response = await axios.post(
          "http://localhost/dummyranks/index.php/user/login",
          {
            username: res.username,
            password: res.password,
          }
        );

        if (response.status === 200) {
          setLogin(true);
          toast.success("You are logged in!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });
        } else {
          setLoginError(true);
          setError(false);
          toast.error(
            "Log In failed! Make sure you have the correct credentials.",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
            }
          );
        }
      } catch (error) {
        setError(true);
        setLoginError(false);
        console.error("An error occurred:", error);
        toast.error("An error occured. Try again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-slate-800">
      <div className="d-flex justify-content-center">
        <section className="w-10/12 bg-slate-600 p-2">
          <div className="form-group">
            <label htmlFor="username" className="text-white font-weight-bold">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={res.username}
              placeholder="Enter a username"
              className="form-control"
              onChange={handleUsernameChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="text-white font-weight-bold">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={res.password}
              placeholder="Enter a password"
              className="form-control"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="d-flex justify-content-end py-3">
            <Link to="/">
              <button className="btn btn-success px-3 py-2 font-weight-bold text-lg me-2">
                BACK
              </button>
            </Link>
            <button
              onClick={processSubmit}
              className="btn btn-warning px-3 py-2 font-weight-bold text-lg"
            >
              SUBMIT
            </button>
          </div>
        </section>
        {error && (
          <div className="w-10/12 bg-red-300">
            An error occurred. Please try again.{" "}
          </div>
        )}
        {loginError && (
          <div className="w-10/12 bg-red-300">
            {" "}
            Invalid credentials. Please try again.{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountLoginForm;
