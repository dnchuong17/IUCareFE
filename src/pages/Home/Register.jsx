import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Api } from "../../utils/API";
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

  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const api = new Api();

  const validateInputs = () => {
    const errors = {};

    if (!doctorName.trim()) errors.doctorName = "Doctor name is required.";
    if (!address.trim()) errors.address = "Address is required.";
    if (!phone.match(/^\d{10,15}$/))
      errors.phone = "Phone number must be 10-15 digits.";
    if (!account.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      errors.account = "Valid email is required.";
    if (password.length < 6)
      errors.password =
          "Password must be at least 6 characters, including letters and numbers.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (!department_id || department_id <= 0)
      errors.department_id = "Department ID must be a positive number.";

    return errors;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validate inputs
    const errors = {};
    if (!doctorName.trim()) errors.doctorName = "Doctor name is required.";
    if (!address.trim()) errors.address = "Address is required.";
    if (!phone.match(/^\d{10,15}$/))
      errors.phone = "Phone number must be 10-15 digits.";
    if (!account.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      errors.account = "Valid email is required.";
    if (password.length < 6)
      errors.password =
          "Password must be at least 6 characters long.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (department_id && isNaN(department_id))
      errors.department_id = "Department ID must be a number.";

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    // Map form data to the DoctorDto structure
    const registerRequest = {
      account,
      password,
      doctorName,
      address,
      phone,
      departmentId: department_id ? Number(department_id) : undefined, // Convert to number if provided
    };

    try {
      const result2 = await api.register(registerRequest);
      if (result2) {
        alert("Registration successful!");
        navigate("/login"); // Redirect to login after successful registration
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
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
                {errorMessages.doctorName && (
                    <p className="text-red-500">{errorMessages.doctorName}</p>
                )}
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
                {errorMessages.address && (
                    <p className="text-red-500">{errorMessages.address}</p>
                )}
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
                {errorMessages.phone && (
                    <p className="text-red-500">{errorMessages.phone}</p>
                )}
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiUserCheck className="text-gray-500" /> Account
                </label>
                <input
                    type="email"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                    placeholder="Enter your email"
                    required
                />
                {errorMessages.account && (
                    <p className="text-red-500">{errorMessages.account}</p>
                )}
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiLock className="text-gray-500" /> Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                    placeholder="Enter your password"
                    required
                />
                {errorMessages.password && (
                    <p className="text-red-500">{errorMessages.password}</p>
                )}
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiLock className="text-gray-500" /> Confirm Password
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                    placeholder="Confirm your password"
                    required
                />
                {errorMessages.confirmPassword && (
                    <p className="text-red-500">{errorMessages.confirmPassword}</p>
                )}
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
                {errorMessages.department_id && (
                    <p className="text-red-500">{errorMessages.department_id}</p>
                )}
              </div>

              <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Register;
