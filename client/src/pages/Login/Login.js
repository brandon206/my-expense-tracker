import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Input from "../../components/Input";
import GoogleIcon from "../../components/GoogleIcon";
import "./Login.scss";

const initialState = { email: "", password: "" };

const Login = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const history = useHistory();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const googleSuccess = async (res) => {
    const profile = res?.profileObj;
    const token = res?.tokenId;
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("profile", JSON.stringify({ profile }));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = async () =>
    alert("Google Login was unsuccessful. Try again!");

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseURL = "http://localhost:5000";
    const url = isSignup ? "/user/register" : "/user/login";
    try {
      const response = await fetch(baseURL + url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          form
        })
      });
      const data = await response.json();
      console.log(data);
      history.push("/");
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="login container">
        <div className="flex justify-center items-center">
          <div className="py-12 px-12 bg-gray-500 rounded-2xl shadow-xl z-20">
            <div>
              <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                {isSignup ? "Sign up" : "Log Into Your Account"}
              </h1>
            </div>
            {!isSignup ? (
              <>
                <GoogleLogin
                  clientId="161075425664-g5vgoepdksnlqsimgv5gk68sqchjb6oq.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      className="google-button w-full justify-center flex bg-blue-400 p-5"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      variant="contained"
                    >
                      <GoogleIcon />
                      Log in with Google
                    </button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                />
                <div className="container separator mt-8">
                  <span>OR</span>
                </div>
              </>
            ) : null}
            <form onSubmit={handleSubmit}>
              <Input
                name="email"
                type="email"
                placeholder="Enter Email Address"
                handleChange={handleChange}
                required
                inputStyle="block text-black text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
              <Input
                name="password"
                type={show ? "text" : "password"}
                placeholder="Password"
                handleChange={handleChange}
                required
                inputStyle="block text-black text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
              <Input
                className="cursor-pointer"
                type="checkbox"
                handleChange={handleClick}
              />
              {show ? " Hide" : " Show"} Password
              {isSignup && (
                <Input
                  name="confirmPassword"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  handleChange={handleChange}
                  required
                  inputStyle="block text-black text-sm py-3 px-4 rounded-lg w-full border outline-none"
                />
              )}
              <div>
                <button className="py-3 w-full text-xl text-white bg-blue-400">
                  {isSignup ? "Sign Up" : "Login"}
                </button>
              </div>
            </form>
            <div className="text-center mt-6">
              <p className="mt-4 text-sm">
                <button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
