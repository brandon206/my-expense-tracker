import React from "react";
import GoogleIcon from "../GoogleIcon";

import './GoogleLoginButton.scss'

const GoogleLoginButton = () => {
  return (
    <button className="google-button">
      <GoogleIcon />
      <div className="button-content">Log in with Google</div>
    </button>
  );
};

export default GoogleLoginButton;
