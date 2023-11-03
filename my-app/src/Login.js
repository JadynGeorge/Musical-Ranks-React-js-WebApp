import React from "react";
import AccountLoginForm from "./AccountLoginForm";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark">
      <div className="text-3xl font-weight-bold text-center text-white pt-5 pb-2">
        <h5>Login</h5>
      </div>
      <AccountLoginForm formType={"login"} />
    </div>
  );
};

export default Login;
