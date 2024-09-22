import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/api/authApi";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div>
      <nav className="Navbar">
        <h1 className="logo" onClick={() => navigate("/")}>
          <span>Kareem To-Do list</span>
          <i class="bi bi-pencil-square"></i>
        </h1>
        <div className="NavbarRight">
          {user ? (
            <div className="NavbarRightItem">
              <h2>
                Welcome <span>{user.username}</span>
              </h2>
              <button onClick={logoutHandler}>
                <i className="bi bi-box-arrow-in-left"></i>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="NavbarRightItem">
              <Link to="/login" className="NavbarBtn">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Login</span>
              </Link>
              <Link to="/register" className="NavbarBtn">
                <i className="bi bi-person-plus"></i>
                <span>Register</span>
              </Link>{" "}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
