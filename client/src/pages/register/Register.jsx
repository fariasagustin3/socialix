import "./register.css";

export default function Register() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socialix</h3>
          <span className="loginDesc">Connect with friends and the world around you on Socialix</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" type="text" className="loginInput" />
            <input placeholder="Email" type="email" className="loginInput" />
            <input placeholder="Password" type="email" className="loginInput" />
            <input placeholder="Password again" type="password" className="loginInput" />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">Log In into account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
