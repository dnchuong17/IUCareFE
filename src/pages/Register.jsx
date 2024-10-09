import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Api } from "../utils/API";
import { RegisterRequest } from "../utils/request/registerRequest";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const api = new Api();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(email, username, password, rePassword);
    const registerRequest = new RegisterRequest();
    registerRequest.email = email;
    registerRequest.account = username;
    registerRequest.password = password;
    registerRequest.rePassword = rePassword;
    await api.register(registerRequest);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
    console.log(rePassword);
  };

  return (
    <div>
      <div className="bg-white px-10 py-20 rounded-3xl border-2 border-blue-500">
        <div className="flexCenter flex-col">
          <h1 className="text-5xl font-semibold text-blue-500">
            Welcome to IU Health Care
          </h1>
          <p className="font-medium text-lg text-gray-500 mt-4 ">
            Please enter your details.
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <div>
            <label className="text-lg font-medium">Username</label>
            <input
              onChange={handleUsernameChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="text-lg font-medium">Email</label>
            <input
              onChange={handleEmailChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>
          <div>
            <label className="text-lg font-medium">Password</label>
            <input
              onChange={handlePasswordChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your password"
              type="password"
              required
            />
          </div>

          <div>
            <label className="text-lg font-medium">Re-enter password</label>
            <input
              onChange={handleRePasswordChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Re-enter your password"
              type="password"
              required
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
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            onClick={onSubmitHandler}
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold"
          >
            Sign Up
          </button>
          <div className="flexCenter gap-2 rounded-xl border-2 border-gray-100">
            <FcGoogle />
            <button className="flex py-3 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
              Sign up with Google
            </button>
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Have an account?</p>
          <button className="text-blue-500 text-base font-medium ml-2np px-2">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
