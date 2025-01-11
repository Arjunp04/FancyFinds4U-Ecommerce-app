import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = ({ token, setToken }) => {
    
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/user/admin`,{email,password});
        console.log(response);
        if (response?.data?.success) {
             const adminToken = response?.data?.adminToken;
             setToken(adminToken);
             navigate("/add-item");
             setEmail("");
             setPassword("");
        }
        else {
            toast.error(response.data.message, {
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
        }
       
    } catch (error) {
        console.log(error);
            toast.error(response.data.message, {
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <div className="text-4xl font-bold tracking-wide text-gray-950 mt-20">
        Fancyfinds4U Logo
      </div>
      <div className="bg-white shadow-lg rounded-lg mt-24 px-8 py-6 max-w-md ">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="text"
              placeholder="youremail@gmail.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2"> Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder=" Your password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md bg-black text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
