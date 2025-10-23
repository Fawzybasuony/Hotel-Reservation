import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      form.email === storedUser.email &&
      form.password === storedUser.password
    ) {
      dispatch(login(storedUser));
      toast.success(`Welcome back, ${storedUser.name}!`);
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome Back 👋
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300"
        >
          Login
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
