import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logOut } from "../redux/feauters/auth/AuthSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const activeStyles = {
    color: "white",
  };

  function logOutHandler() {
    dispatch(logOut());
    localStorage.removeItem("token")
    toast("Уou are logged out")
  }
  return (
    <div className="flex py-2 px-2 justify-between items-center">
      <span className="flex justify-center items-center w-8 h-8 bg-gray-600 text-xs text-white rounded-sm">
        Logo
      </span>
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}>
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}>
              Add Post
            </NavLink>
          </li>
        </ul>
      )}
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? <Link to="/login" onClick={logOutHandler}>Logout</Link> : <Link to="/login">Login</Link>}
      </div>
    </div>
  );
}
