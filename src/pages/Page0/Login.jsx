import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Api } from "../../utils/API";
import { LoginRequest } from "../../utils/request/loginRequest";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const api = new Api();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const loginRequest = new LoginRequest();
    loginRequest.account = username;
    loginRequest.password = password;

    try {
      const response = await api.login(loginRequest);

      if (response) {
        setLoginMessage("Login successful!");
        // navigate("/");
        setTimeout (() => {
          navigate("/page1");
        },3000);
      } else {
        setLoginMessage("Account does not exist.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginMessage("Login failed. Please check your credentials and try again.");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
      <div className="relative px-20 ">
        {loginMessage && (
            <div
                className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-24 p-4 rounded-lg shadow-lg w-1/3 ${
                    loginMessage === "Login successful!" ? "bg-green-50 border-2 border-green-500" : "bg-red-100 border-2 border-red-500"
                }`}
            >
              <p
                  className={`text-lg font-bold text-center ${
                      loginMessage === "Login successful!" ? "text-black" : "text-red-700"
                  }`}
              >
                {loginMessage}
              </p>
              <div className="flex justify-center mt-3">
                <button
                    onClick={() => setLoginMessage("")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>

              </div>
            </div>
        )}

        <div className="flex flex-col lg:flex-row bg-white px-10 py-20 rounded-3xl border-2 border-blue-500">
          <div className="w-full lg:w-2/5 flex flex-col items-center justify-center p-12 bg-cover bg-center">
            <h1 className="text-5xl font-semibold text-blue-500 drop-shadow-lg text-center">
              Welcome Back
            </h1>
            <p className="font-medium text-lg text-gray-500 mt-4 text-center">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="w-full lg:w-1/2 py-10 px-10">
            <form onSubmit={onSubmitHandler} className="mt-5 space-y-4">
              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <AiOutlineUser className="text-gray-500" />
                  Username
                </label>
                <input
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent shadow-lg"
                    placeholder="example: username"
                />
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <AiOutlineLock className="text-gray-500" />
                  Password
                </label>

                <div className="relative flex items-center">
                  <input
                      value={password}
                      onChange={handlePasswordChange}
                      type={showPassword ? "text" : "password"}
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent shadow-lg"
                      placeholder="*********"
                  />
                  <div
                      className="absolute right-3 inset-y-0 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button className="font-medium text-base text-blue-500">
                  Forgot password
                </button>
              </div>

              <div className="flex flex-col mt-8 gap-y-4">
                <button
                    onClick={onSubmitHandler}
                    className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold"
                >
                  Sign In
                </button>
                <div className="flexCenter gap-2 rounded-xl border-2 border-gray-100">
                  <FcGoogle />
                  <button className="flex py-3 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
                    Sign in with Google
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">Do not have an account?</p>
                <button
                    onClick={() => navigate("/register")}
                    className="text-blue-500 text-base font-medium ml-2"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
