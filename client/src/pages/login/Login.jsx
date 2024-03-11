import { useContext, useEffect, useRef } from "react";
import { loginCall } from "../../apiCalls";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { Link, redirect } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  // function that is executed when clicking on the login button
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    console.log(user)
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socialix</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socialix
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              minLength={6}
              required
            />
            <button className="loginButton">
              {isFetching ? <CircularProgress color="inherit" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <Link to="/register" className="loginRegisterButton">
              <button className="loginRegisterButton">
                Create a new account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
