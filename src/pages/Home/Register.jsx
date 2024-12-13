import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Api } from "../../utils/api";
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
  const [departmentNumber, setDepartmentNumber] = useState("");
  const [departments, setDepartments] = useState([]);


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
    if (!departmentNumber)
      errors.departmentNumber = "Please select a department.";
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
      departmentNumber,    };

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
          onClose: () => navigate("/login"),
        });
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
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
          initial={{opacity: 0, scale: 0.5}}
          animate={{opacity: 1, scale: 1}}
          transition={{
            duration: 0.5,
            delay: 0.75,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative px-4 sm:px-8 md:px-20"
      >
        <div
            className="flex flex-col lg:flex-row bg-white rounded-3xl border-2 border-blue-500 p-6 sm:p-10 md:p-16 shadow-lg">
          {/* Left Section */}
          <div className="w-full lg:w-2/5 flex flex-col items-center justify-center p-8 md:p-12 bg-cover bg-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-blue-500 drop-shadow-lg text-center">
              Welcome to <br/> IU Health Care
            </h1>
            <p className="font-medium text-base sm:text-lg text-gray-500 mt-4 text-center">
              Please enter your details.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-3/5 py-8 px-6 sm:px-10 md:px-16">
            <p className="text-2xl sm:text-3xl mb-4 text-center lg:text-left">
              Create your account
            </p>

            <form className="mt-5 space-y-6" onSubmit={onSubmitHandler}>
              {/* Input Fields */}
              {[
                {
                  label: "Doctor Name",
                  icon: <FiUser/>,
                  type: "text",
                  value: doctorName,
                  onChange: setDoctorName,
                  placeholder: "Enter your name",
                  error: errorMessages.doctorName,
                },
                {
                  label: "Address",
                  icon: <FiHome/>,
                  type: "text",
                  value: address,
                  onChange: setAddress,
                  placeholder: "Enter your address",
                  error: errorMessages.address,
                },
                {
                  label: "Phone Number",
                  icon: <FiPhone/>,
                  type: "tel",
                  value: phone,
                  onChange: setPhone,
                  placeholder: "Enter your phone number",
                  error: errorMessages.phone,
                },
                {
                  label: "Account",
                  icon: <FiUserCheck/>,
                  type: "email",
                  value: account,
                  onChange: setAccount,
                  placeholder: "Enter your email",
                  error: errorMessages.account,
                },
              ].map(({label, icon, type, value, onChange, placeholder, error}, index) => (
                  <div key={index}>
                    <label className="text-lg font-medium flex items-center gap-2">
                      {icon} {label}
                    </label>
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                        placeholder={placeholder}
                        required
                    />
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
              ))}

              {/* Password Fields */}
              {[{
                label: "Password",
                value: password,
                setValue: setPassword,
                show: showPassword,
                setShow: setShowPassword,
                error: errorMessages.password,
              }, {
                label: "Confirm Password",
                value: confirmPassword,
                setValue: setConfirmPassword,
                show: showConfirmPassword,
                setShow: setShowConfirmPassword,
                error: errorMessages.confirmPassword,
              }].map(({label, value, setValue, show, setShow, error}, index) => (
                  <div key={index}>
                    <label className="text-lg font-medium flex items-center gap-2">
                      <FiLock className="text-gray-500"/> {label}
                    </label>
                    <div className="relative flex">
                      <input
                          type={show ? "text" : "password"}
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                          placeholder={`Enter your ${label.toLowerCase()}`}
                          required
                      />
                      <div
                          className="absolute right-3 inset-y-0 flex items-center cursor-pointer"
                          onClick={() => setShow(!show)}
                      >
                        {show ? <FiEyeOff/> : <FiEye/>}
                      </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
              ))}

              {/* Department Select */}
              <div>
                <label className="text-lg font-medium flex items-center gap-2">
                  <FiClipboard className="text-gray-500"/> Department Number
                </label>
                <select
                    value={departmentNumber}
                    onChange={(e) => setDepartmentNumber(e.target.value)}
                    className="border border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent shadow-lg"
                    required
                >
                  <option value="" disabled>
                    Select your department number
                  </option>
                  {["203", "302", "408", "610", "612", "613", "666"].map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                  ))}
                </select>
                {errorMessages.departmentNumber && (
                    <p className="text-red-500">{errorMessages.departmentNumber}</p>
                )}
              </div>

              {/* Policy Agreement */}
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

              {/* Submit and Google Sign-In */}
              <div className="flex flex-col mt-8 gap-y-4">
                <button
                    type="submit"
                    className="py-3 rounded-xl bg-blue-500 text-white text-lg font-bold hover:scale-[1.01] transition-all"
                >
                  Register
                </button>
                <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-100">
                  <FcGoogle/>
                  <button className="py-3 text-lg hover:scale-[1.01] transition-all">
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
        <ToastContainer/>
      </motion.div>

  );
};

export default Register;
