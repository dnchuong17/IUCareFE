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
  const [department_id, setDepartment_id] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [doctorNameError, setDoctorNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [accountError, setAccountError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [departmentIdError, setDepartmentIdError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerMessage, setRegisterMessage] = useState(false);


  const api = new Api();
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');


    let valid = true;

    // Reset errors
    setDoctorNameError("");
    setAddressError("");
    setPhoneError("");
    setAccountError("");
    setPasswordError("");
    setConfirmPassword("");
    setDepartmentIdError("");

    // // Validate inputs
    // if (!/^[a-zA-Z\s'-]+$/.test(doctorName)) {
    //   setDoctorNameError(
    //     "Doctor name must contain only letters and valid characters."
    //   );
    //   valid = false;
    // }
    //
    // if (!/^[a-zA-Z\s'-]+$/.test(address)) {
    //   setAddressError(
    //     "Address must contain only letters and valid characters."
    //   );
    //   valid = false;
    // }
    //
    // if (!/^\d+$/.test(phone)) {
    //   setPhoneError("Phone number must contain only digits.");
    //   valid = false;
    // }
    // if (!/^[a-zA-Z\s'-]+$/.test(account)) {
    //   setAccountError(
    //     "Account must contain only letters and valid characters."
    //   );
    //   valid = false;
    // }
    // if (isNaN(department_id) || department_id <= 0) {
    //   setDepartmentIdError("Department ID must be a positive number.");
    //   valid = false;
    // }
    // if (password !== confirmPassword) {
    //   setPasswordError("Passwords do not match.");
    //   valid = false;
    // }
    //
    // if (!valid) return;

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
      setRegisterMessage("Registration successful!");
      // setErrorMessage("");
    } catch (error) {
      console.error(error);
      setRegisterMessage("Registration failed. Please try again.");
      // setSuccessMessage( "");
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
      <div className="relative px-20">
        {registerMessage && (
            <div
                className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-24 p-4 rounded-lg shadow-lg w-1/3 ${
                    registerMessage === "Registration successful!" ? "bg-green-50 border-2 border-green-500" : "bg-red-100 border-2" +
                        " border-red-500"
                }`}
            >
              <p
                  className={`text-lg font-bold text-center ${
                      registerMessage === "Registration successful!" ? "text-black" : "text-red-700"
                  }`}
              >
                {registerMessage}
              </p>
              <div className="flex justify-center mt-3 space-x-3">
                <button
                    onClick={() => setRegisterMessage("")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>

                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-500 text-white px-4 py-2 rounded">

                  Sign In
                </button>
              </div>
            </div>
        )}

          <div className="flex flex-col lg:flex-row bg-white px-30 rounded-3xl border-2 border-blue-500 py-35 ">
            <div className="w-full lg:w-2/5 flex flex-col items-between justify-center p-12 bg-cover bg-center">
              <h1 className="text-5xl font-semibold text-blue-500 drop-shadow-lg text-center">
                Welcome to <br/> IU Health Care
              </h1>
              <p className="font-medium text-lg text-gray-500 mt-4 text-center">
                Please enter your details.
              </p>
            </div>

            <div className="w-full lg:w-1/2 py-10 px-10">
              <p className="text-3xl mb-4">Create your account.</p>

              <form className="mt-5 space-y-4" onSubmit={onSubmitHandler}>
                <div>
                  <label
                      id="doctorName"
                      className="text-lg font-medium flex items-center gap-2"
                  >
                    <FiUser className="text-gray-500"/> Doctor Name
                  </label>
                  {doctorNameError && (
                      <p className="text-red-500">{doctorNameError}</p>
                  )}
                  <input
                      type="text"
                      onChange={handleDoctorNameChange}
                      className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                      placeholder="Enter your name"
                      required
                  />
                </div>

                <div className="w-full">
                  <label className="text-lg font-medium flex items-center gap-2">
                    <FiHome className="text-gray-500"/>
                    Address
                  </label>
                  {addressError && <p className="text-red-500">{addressError}</p>}
                  <input
                      onChange={handleAddressChange}
                      className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                      placeholder="Enter your address"
                      type="text"
                      required
                  />
                </div>
                <div>
                  <label className="text-lg font-medium flex items-center gap-2">
                    <FiPhone className="text-gray-500"/>
                    Phone Number
                  </label>
                  {phoneError && <p className="text-red-500">{phoneError}</p>}
                  <input
                      onChange={handlePhoneChange}
                      className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                      placeholder="Enter your phone number"
                      type="tel"
                      required
                  />
                </div>

                <div>
                  <label className="text-lg font-medium flex items-center gap-2">
                    <FiUserCheck className="text-gray-500"/> Account
                  </label>
                  {accountError && <p className="text-red-500">{accountError}</p>}
                  <input
                      onChange={handleAccountChange}
                      className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                      placeholder="Enter your account"
                      type="text"
                      required
                  />
                </div>

                <div>
                  <label className="text-lg font-medium flex items-center gap-2">
                    <FiLock className="text-gray-500"/> Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                        onChange={handlePasswordChange}
                        className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        required
                    />
                    <div
                        className="absolute right-3 inset-y-0 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff/> : <FiEye/>}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-lg font-medium flex items-center gap-2">
                    <FiLock className="text-gray-500"/>
                    Confirm Password
                  </label>
                  {passwordError && <p className="text-red-500">{passwordError}</p>}
                  <div className="relative flex items-center">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 py-2 px-4 w-full rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent
              shadow-lg"
                        placeholder="Confirm your password"
                        required
                    />
                    <div
                        className="absolute right-3 inset-y-0 flex items-center cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff/> : <FiEye/>}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-lg font-medium flex items-center gap-2">
                    <FiClipboard className="text-gray-500"/> Department ID
                  </label>
                  {departmentIdError && (
                      <p className="text-red-500">{departmentIdError}</p>
                  )}
                  <input
                      onChange={handleDepartment_idChange}
                      className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                      placeholder="Enter your department ID"
                      type="number"
                      required
                  />
                </div>

                <div className="mt-5 flex items-center">
                  <input
                      type="checkbox"
                      className="border border-gray-300 rounded text-purple-500 focus:ring-2 focus:ring-blue-500 focus:outline-none "
                  />
                  <div className="ml-2">
                I accept the{" "}
                    <a href="#" className="text-blue-500 font-semibold">
                  Terms of Use
                </a>{" "}
                    &
                <a href="#" className="text-blue-500 font-semibold">
                  {" "}
                  Privacy Policy
                </a>
              </div>
                </div>

                <div className="flex flex-col mt-8 flex gap-y-4">
                  <button
                      onClick={onSubmitHandler}
                      className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold"
                  >
                    Sign Up
                  </button>
                  <div className="flexCenter gap-2 rounded-xl border-2 border-gray-100">
                    <FcGoogle/>
                    <button
                        onClick={() => navigate("/")}

                        className="flex py-3 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
                      Sign up with Google
                    </button>
                  </div>
                </div>
                <div className="mt-8 flex justify-center items-center">
                  <p className="font-medium text-base">Have an account?</p>
                  <button
                      onClick={() => navigate("/login")}
                      className="text-blue-500 text-base font-medium ml-2np px-2"
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