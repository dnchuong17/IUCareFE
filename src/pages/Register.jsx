import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Api } from "../utils/API";
import { RegisterRequest } from "../utils/request/registerRequest";

const Register = () => {
  const [doctorName, setDoctorName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [department_id, setDepartment_id] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const api = new Api();
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // if (password !== rePassword) {
    //   setErrorMessage("Passwords do not match");
    //   return;
    // }

    console.log(doctorName, address, phone, account, password, department_id);
    const registerRequest = new RegisterRequest();
    registerRequest.doctorName = doctorName;
    registerRequest.address = address;
    registerRequest.phone = phone;
    registerRequest.account = account;
    registerRequest.password = password;
    registerRequest.department_id = department_id;

    try {
      // Sử dụng phương thức POST
      const result = await api.register(registerRequest);
      console.log(result);
      setSuccessMessage("Registration successful!");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Registration failed. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleDoctorNameChange = (event) => {
    setDoctorName(event.target.value);
    console.log(doctorName);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    console.log(address);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    console.log(phone);
  };

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
    console.log(account);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleDepartment_idChange = (event) => {
    setDepartment_id(event.target.value);
    console.log(department_id);
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
        <form className="mt-8 space-y-4" onSubmit={onSubmitHandler}>
          <div>
            <label id="doctorName" className="text-lg font-medium">
              Doctor Name
            </label>
            <input
              type="text"
              onChange={handleDoctorNameChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="text-lg font-medium">Address</label>
            <input
              onChange={handleAddressChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your address"
              type="text"
              required
            />
          </div>
          <div>
            <label className="text-lg font-medium">Phone Number</label>
            <input
              onChange={handlePhoneChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your phone number"
              type="number"
              required
            />
          </div>

          <div>
            <label className="text-lg font-medium">Account</label>
            <input
              onChange={handleAccountChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your account"
              type="text"
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
            <label className="text-lg font-medium">Department IDt</label>
            <input
              onChange={handleDepartment_idChange}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your department ID"
              type="number"
              required
            />
          </div>
        </form>
        {successMessage && (
          <div className="mt-4 text-green-500 font-medium">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-500 font-medium">{errorMessage}</div>
        )}

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
