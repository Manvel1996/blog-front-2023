import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, loginUser } from "../redux/feauters/auth/AuthSlice";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate("/");
    }
  }, [status, navigate, isAuth]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ userName, password }));
      setPassword("");
      setUserName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-lg text-white text-center">Login</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="UserName"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-600"
        />
      </label>
      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-600"
        />
      </label>
      <div className="flex justify-center gap-8 mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center text-xs text-white rounded-sm py-2 px-4 bg-gray-600">
          Login
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center text-xs text-white">
          Create new account ?
        </Link>
      </div>
    </form>
  );
}
