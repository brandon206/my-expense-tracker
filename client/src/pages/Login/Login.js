import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "../../components/GoogleIcon";
import "./Login.scss";

const initialState = { email: "", password: "" };

const Login = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => setEmail(event.target.value);
  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [form, setForm] = useState(initialState);
  // const handleChange = (e) =>
  //   setForm({ ...form, [e.target.name]: e.target.value });
  const handleClick = () => setShow(!show);

  const googleSuccess = async (res) => {
    console.log(res);
    const profile = res?.profileObj;
    const token = res?.tokenId;
    console.log('profile: ', profile);
    try {
      localStorage.setItem("token", token);
      localStorage.setItem('profile', JSON.stringify({ profile }));
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = async () => {
    console.log('Google Login was unsuccessful. Try again!');
  };
  // const handleGoogleLogin = async () => {
  //   const response = await fetch("http://localhost:5000/auth/google");
  //   const data = await response.json();
  //   console.log("google login!: ", data);
  //   if (data.status === "success") {
  //     localStorage.setItem("token", data.token);
  //   }
  // };
  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    if (data.status === 'success') {
      localStorage.setItem('token', data.token);
    }
  };
  return (
    <>
      <div className="login container">
        <div className="flex justify-center items-center">
          <div className="py-12 px-12 bg-gray-500 rounded-2xl shadow-xl z-20">
            <div>
              <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                Log Into Your Account
              </h1>
            </div>
            <GoogleLogin
              clientId={process.env.GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <button
                  className="google-button w-full justify-center"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  variant="contained"
                ><GoogleIcon />Log in with Google</button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <div className="container separator mt-8">
              <span>OR</span>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Email Address"
                value={email}
                onChange={handleEmailChange}
                className="block text-black text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="block text-black text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
              <input
                className="cursor-pointer"
                type="checkbox"
                onClick={handleClick}
              />
              {show ? " Hide" : " Show"} Password
            </div>
            <div className="text-center mt-6">
              <button
                className="py-3 w-full text-xl text-white bg-blue-400"
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="mt-4 text-sm">
                Don't Have An Account?{" "}
                <Link className="link" to="/signup">
                  Sign Up
                </Link>
              </p>
              <p className="mt-4 text-sm">
                Forgot Your Password?{" "}
                <Link className="link" to="/forgot-password">
                  Create New Password
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
