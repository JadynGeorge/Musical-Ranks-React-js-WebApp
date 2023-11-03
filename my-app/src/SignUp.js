import React from "react";
import AccountSignUpForm from "./AccountSignUpForm";

const Signup = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark">
      <div className="text-3xl font-weight-bold text-center text-white pt-5 pb-2">
        Create Account
      </div>
      <AccountSignUpForm formType={"register"} />
    </div>
  );
};

export default Signup;
