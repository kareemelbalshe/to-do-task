import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../redux/api/authApi';
import "./auth.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const disPatch = useDispatch();
  
    const formSubmitHandler = (e) => {
      e.preventDefault();
      if (email.trim() === "") return toast.error("Email is required");
      if (password.trim() === "") return toast.error("Password is required");

      disPatch(loginUser({ email, password }));
    };
    return (
      <div className="auth">
        <h1>Login</h1>
        <form onSubmit={formSubmitHandler}>
          <div className="FormGroup">
            <label htmlFor="email" className="FormLabel">
              Email
            </label>
            <input
              type="email"
              user=""
              id="email"
              placeholder="Enter your email"
              className="FormInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="FormGroup">
            <label htmlFor="password" className="FormLabel">
              Password
            </label>
            <input
              type="password"
              user=""
              id="password"
              placeholder="Enter your password"
              className="FormInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="FormBtn">
            Login
          </button>
        </form>
        <div className="FormFooter">
          Create account <Link to="/register">Register</Link>
        </div>
      </div>
    );
}
