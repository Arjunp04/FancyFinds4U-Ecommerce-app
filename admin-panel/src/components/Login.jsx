import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Login = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response?.data?.success) {
        const adminToken = response?.data?.adminToken;
        setToken(adminToken);
        navigate("/");
        setEmail("");
        setPassword("");
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
      } else {
        toast.error(response.data.message || "Login failed!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Logo Section */}
      <div className="w-60 mb-8">
        <img src={assets.logo} alt="fancyfinds4u logo" loading="lazy"/>
      </div>

      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Admin Login
        </h1>

        <form onSubmit={onSubmitHandler}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
              type="email"
              placeholder="youremail@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
              type="password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full py-2 mt-4 text-white bg-blue-800 rounded-md hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-600">
        © {new Date().getFullYear()} Fancyfinds4U. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
