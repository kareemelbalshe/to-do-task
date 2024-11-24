import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
        <div className="img"><img src={"/assets/images/task-list.png"} alt="img" /></div>
      <div className="content">
        <h1>Welcome to My To-Do app</h1>
        <p>It's a great way to manage your tasks and stay organized.</p>
        <Link to="/register" className="btn">Create a new To-Do list</Link>
      </div>
    </div>
  );
}
