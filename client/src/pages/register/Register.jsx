import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useRef } from "react";
import axios from "axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  // navigate react-router-dom
  const navigate = useNavigate()

  // function that executes when user click on submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("http://localhost:8800/api/auth/register", user);
        navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }
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
              placeholder="Username"
              ref={username}
              type="text"
              className="loginInput"
              required
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              className="loginInput"
              required
            />
            <input
              placeholder="Password"
              ref={password}
              type="password"
              className="loginInput"
              required
            />
            <input
              placeholder="Password again"
              ref={passwordAgain}
              type="password"
              minLength={6}
              className="loginInput"
              required
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login" className="loginRegisterButton">
              <button className="loginRegisterButton">
                Log In into account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
