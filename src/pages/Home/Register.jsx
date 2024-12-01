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
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [policyAgreement, setPolicyAgreement] = useState(false);
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
      errors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (!department_id || department_id <= 0)
      errors.department_id = "Department ID must be a positive number.";
    if (!policyAgreement)
      errors.policyAgreement = "You must agree to the terms and conditions.";

    return errors;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const errors = validateInputs();

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    const registerRequest = {
      account,
      password,
      doctorName,
      address,
      phone,
      departmentId: department_id ? Number(department_id) : undefined,
    };

    try {
      const result2 = await api.register(registerRequest);
      if (result2) {
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Wait for the toast to close before navigating
        toast.onChange(({ status }) => {
          if (status === "removed") {
            navigate("/login");
          }
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
      <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.75,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative px-20"
      >
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
                  <FiUser className="text-gray-500"/> Doctor Name
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
                  <FiHome className="text-gray-500"/> Address
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
                  <FiPhone className="text-gray-500"/> Phone Number
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
                  <FiUserCheck className="text-gray-500"/> Account
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
                  <FiLock className="text-gray-500"/> Password
                </label>
                <div className="relative flex">
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
                    {showPassword ? <FiEyeOff/> : <FiEye/>}
                  </div>
                </div>
                {errorMessages.password && (
                    <p className="text-red-500">{errorMessages.password}</p>
                )}
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiLock className="text-gray-500"/> Confirm Password
                </label>
                <div className="relative flex">
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
                    {showConfirmPassword ? <FiEyeOff/> : <FiEye/>}
                  </div>
                </div>
                {errorMessages.confirmPassword && (
                    <p className="text-red-500">{errorMessages.confirmPassword}</p>
                )}
              </div>

              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiClipboard className="text-gray-500"/> Department ID
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

              {/* Policy Agreement Checkbox */}
              <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={policyAgreement}
                    onChange={(e) => setPolicyAgreement(e.target.checked)}
                    className="w-5 h-5"
                />
                <label className="text-gray-700">
                  I agree to the terms and conditions.
                </label>
              </div>
              {errorMessages.policyAgreement && (
                  <p className="text-red-500">{errorMessages.policyAgreement}</p>
              )}

              <div className="flex flex-col mt-8 gap-y-4">
                <button
                    type="submit"
                    className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold"
                >
                  Register
                </button>
                <div className="flexCenter gap-2 rounded-xl border-2 border-gray-100">
                  <FcGoogle />
                  <button
                      className="flex py-3 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
                  >
                  <FcGoogle/>
                  <button
                      className="flex py-3 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
                    Sign in with Google
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">Have an account?</p>
                <button
                    onClick={() => navigate("/login")}
                    className="text-blue-500 text-base font-medium ml-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
        <ToastContainer/>
      </motion.div>
  );
};

export default Register;
