import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Api } from "../../utils/API";
import { LoginRequest } from "../../utils/request/loginRequest";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const api = new Api();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(username, password);
    const loginRequest = new LoginRequest();
    loginRequest.account = username;
    loginRequest.password = password;
    api.login(loginRequest);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  return (
    <div>
      <div className="bg-white px-10 py-20 rounded-3xl border-2 border-blue-500">
        <div className="flexCenter flex-col">
          <h1 className="text-5xl font-semibold text-blue-500 drop-shadow-lg">
            Welcome Back
          </h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <div>
            <label className="text-lg font-medium">Username</label>
            <input
              onChange={handleUsernameChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent shadow-lg"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="text-lg font-medium">Password</label>
            <input
              onChange={handlePasswordChange}
              type="password"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent shadow-lg"
              placeholder="Enter your password"
            />
          </div>
        </form>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember" />
            <label className="ml-2 font-medium text-base" htmlFor="remember">
              Remember for 30 days
            </label>
          </div>
          <button className="font-medium text-base text-blue-500">
            Forgot password
          </button>
        </div>
        <div className="mt-8 flex mx-auto flex-col gap-y-4 w-1/2">
          <button
            onClick={onSubmitHandler}
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold shadow-lg"
          >
            Sign In
          </button>
          <div className="flexCenter gap-2 rounded-xl border-2 border-gray-100 shadow-lg">
            <FcGoogle />
            <button className="flex py-3 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
              Sign in with Google
            </button>
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Do not have an account?</p>
          <button className="text-blue-500 text-base font-medium ml-2np px-2">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
