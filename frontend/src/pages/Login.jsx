import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl, loading, setLoading } =
    useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true); // Disable button during API call
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message, {
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
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message, {
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
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsButtonDisabled(false); // Enable button after API call
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <div className="relative w-full mt-5">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:border-blue-700 pl-10"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FaUser className="absolute top-3 left-3 text-gray-500" />
        </div>
      )}

      <div className="relative w-full ">
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:border-blue-700 pl-10"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FaEnvelope className="absolute top-3 left-3 text-gray-500" />
      </div>

      <div className="relative w-full">
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:border-blue-700 pl-10"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FaLock className="absolute top-3 left-3 text-gray-500" />
      </div>

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className=" cursor-pointer text-gray-700 hover:text-gray-900 transition-all duration-200">
          Forgot your password?
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className=" cursor-pointer text-gray-700 hover:text-gray-900 transition-all duration-200"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className=" cursor-pointer text-gray-700 hover:text-gray-900 transition-all duration-200"
          >
            Login here
          </p>
        )}
      </div>

      <button
        className={`bg-blue-800 text-white py-2 px-8 font-light mt-4 rounded-md ${
          isButtonDisabled
            ? "bg-blue-700 cursor-not-allowed"
            : "hover:bg-blue-700"
        }`}
        disabled={isButtonDisabled}
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
