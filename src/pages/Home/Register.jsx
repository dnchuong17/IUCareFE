import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Api } from "../../utils/API";
import { RegisterRequest } from "../../utils/request/registerRequest";
import { useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiHome,
  FiPhone,
  FiUserCheck,
  FiLock,
  FiClipboard,
} from "react-icons/fi";

const Register = () => {
  const [doctorName, setDoctorName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department_id, setDepartment_id] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const api = new Api();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const registerRequest = new RegisterRequest();
    registerRequest.doctorName = doctorName;
    registerRequest.address = address;
    registerRequest.phone = phone;
    registerRequest.account = account;
    registerRequest.password = password;
    registerRequest.department_id = department_id;

    try {
      const result = await api.register(registerRequest);
      if (result) {
        alert("Registration successful!");
        navigate("/login"); // Redirect to login page after success
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
      <div className="relative px-20">
        <div className="flex flex-col lg:flex-row bg-white px-30 rounded-3xl border-2 border-blue-500 py-35">
          <div className="w-full lg:w-2/5 flex flex-col items-center justify-center p-12 bg-cover bg-center">
            <h1 className="text-5xl font-semibold text-blue-500 drop-shadow-lg text-center">
              Welcome to <br /> IU Health Care
            </h1>
            <p className="font-medium text-lg text-gray-500 mt-4 text-center">
              Please enter your details.
            </p>
          </div>

          <div className="w-full lg:w-1/2 py-10 px-10">
            <p className="text-3xl mb-4">Create your account.</p>

            <form className="mt-5 space-y-4" onSubmit={onSubmitHandler}>
              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiUser className="text-gray-500" /> Doctor Name
                </label>
                <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                    placeholder="Enter your name"
                    required
                />
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiHome className="text-gray-500" /> Address
                </label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                    placeholder="Enter your address"
                    required
                />
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiPhone className="text-gray-500" /> Phone Number
                </label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                    placeholder="Enter your phone number"
                    required
                />
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiUserCheck className="text-gray-500" /> Account
                </label>
                <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                    placeholder="Enter your account"
                    required
                />
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiLock className="text-gray-500" /> Password
                </label>
                <div className="relative flex items-center">
                  <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                      placeholder="Enter your password"
                      required
                  />
                  <div
                      className="absolute right-3 inset-y-0 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiLock className="text-gray-500" /> Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                      placeholder="Confirm your password"
                      required
                  />
                  <div
                      className="absolute right-3 inset-y-0 flex items-center cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiClipboard className="text-gray-500" /> Department ID
                </label>
                <input
                    type="number"
                    value={department_id}
                    onChange={(e) => setDepartment_id(e.target.value)}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                    placeholder="Enter your department ID"
                    required
                />
              </div>

              <div className="mt-5 flex items-center">
                <input
                    type="checkbox"
                    className="border border-gray-300 rounded text-purple-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="ml-2">
                  I accept the{" "}
                  <a href="#" className="text-blue-500 font-semibold">
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-blue-500 font-semibold">
                    Privacy Policy
                  </a>
                </div>
              </div>

              <div className="flex flex-col mt-8 gap-y-4">
                <button
                    type="submit"
                    className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold"
                >
                  Sign Up
                </button>
                <div className="flexCenter gap-2 rounded-xl border-2 border-gray-100">
                  <FcGoogle />
                  <button
                      onClick={() => navigate("/")}
                      className="flex py-3 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
                  >
                    Sign up with Google
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">Have an account?</p>
                <button
                    onClick={() => navigate("/login")}
                    className="text-blue-500 text-base font-medium ml-2"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Register;
