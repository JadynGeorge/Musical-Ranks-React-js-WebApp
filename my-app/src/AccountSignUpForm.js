import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountSignUpForm = (options) => {
  const [res, setRes] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  let navigate = useNavigate();

  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");

  useEffect(() => {
    //we want to ask user to login
    if (submit) {
      return navigate("/");
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

  const handleConfirmPasswordChange = (event) => {
    event.persist();
    setRes((res) => ({
      ...res,
      confirm_password: event.target.value,
    }));
  };

  //once the button is clicked; it called this processSubmit function
  const processSubmit = async () => {
    //check data
    try {
      if (options.formType === "register") {
        const response = await axios.post(
          "http://localhost/dummyranks/index.php/user/create",
          {
            username: res.username,
            password: res.password,
            confirm_password: res.confirm_password,
          }
        );
        console.log(response);
        if (response.data.success) {
          setSubmit(true);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });
        } else {
          toast.warning(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      }
    } catch (error) {
      setError(true);
      console.error("An error occurred:", error);
      toast.warning("Fill the fields correctly!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
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

          <div className="flex text-lg font-semibold space-x-4">
            <label
              htmlFor="confirm_password"
              className="text-white font-weight-bold"
            >
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              name="confirm_password"
              value={res.confirm_password}
              placeholder="Confirm password"
              className="form-control"
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <div className="flex justify-end py-3 space-x-3">
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
            An error occurred. Please try again. Make sure you enter the same
            passwords.{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSignUpForm;
