import PropTypes from "prop-types";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Api } from "../../utils/api.ts";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const InformationForm = ({ isOpen, onClose }) => {
  const api = new Api();
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    address: "",
    major: "",
    phone: "",
    studentId: "",
    allergy: "",
  });

  const [loading, setLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, address, major, phone, studentId } = info;
    if (!name || !address || !major || !phone || !studentId) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log("Submitting info:", info);
      const response = await api.createPatient(info);

      if (response) {
        toast.success("Information saved successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            navigate("/appointmentPage");
            onClose(); // Close the popup after the toast
          },
        });
      } else {
        toast.error(
            "Failed to save information. API did not return a response.",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
        );
      }
    } catch (error) {
      console.error(
          "Error saving information:",
          error?.response?.data || error.message
      );
      toast.error(
          error?.response?.data?.message ||
          "Failed to save information. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-xl p-7 w-full max-w-lg mx-4 md:mx-0 md:w-1/2">
            {/* Close Button with X Icon */}
            <button
                onClick={onClose}
                className="text-gray-700 hover:text-gray-900"
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="text-2xl font-semibold text-center text-gray-600 w-full mb-2">
              Booking Appointment
            </h2>
            <div className="flex justify-center mb-4">
              <button
                  className={`px-4 py-2 rounded-l-full ${
                      isSearchMode
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setIsSearchMode(true)}
              >
                Search Mode
              </button>
              {/*<button*/}
              {/*    className={`px-4 py-2 rounded-r-full ${*/}
              {/*        !isSearchMode*/}
              {/*            ? "bg-blue-600 text-white"*/}
              {/*            : "bg-gray-200 text-gray-700"*/}
              {/*    }`}*/}
              {/*    // onClick={() => setIsSearchMode(false)}*/}
              {/*>*/}
              {/*  Form Mode*/}
              {/*</button>*/}
            </div>
            <hr className="mb-4" />
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-1">
              {/* Full Name */}
              <div className="p-0.5 rounded-lg text-gray-700">
                <label
                    className="block mb-2 font-medium text-blue-800"
                    htmlFor="name"
                >
                  Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={info.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full p-2 border border-gray-200 rounded-lg bg-white-100"
                    required
                />
              </div>

              {/* Student ID */}
              <div className="p-0.5 rounded-lg text-gray-700">
                <label
                    className="block mb-2 font-medium text-blue-800"
                    htmlFor="studentId"
                >
                  Student ID
                </label>
                <input
                    type="text"
                    name="studentId"
                    value={info.studentId}
                    onChange={handleChange}
                    placeholder="Enter student ID"
                    className="w-full p-2 border border-gray-200 rounded-lg bg-white-100"
                    required
                />
              </div>

              {/* Major */}
              {/* Major and Phone */}
              <div className="flex flex-row justify-center items-center space-x-4">
                {/* Major */}
                <div className="w-full max-w-md p-0.5 rounded-lg text-gray-700">
                  <label
                      className="block mb-2 font-medium text-blue-800"
                      htmlFor="major"
                  >
                    Major
                  </label>
                  <input
                      type="text"
                      name="major"
                      value={info.major}
                      onChange={handleChange}
                      placeholder="Enter major"
                      className="w-full p-2 border border-gray-200 rounded-lg bg-white-100"
                      required
                  />
                </div>

                {/* Phone */}
                <div className="w-full max-w-md p-0.5 rounded-lg text-gray-700">
                  <label
                      className="block mb-2 font-medium text-blue-800"
                      htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                      type="text"
                      name="phone"
                      value={info.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full p-2 border border-gray-200 rounded-lg bg-white-100"
                      required
                  />
                </div>
              </div>
              {/* Address */}
              <div className="p-0.5 rounded-lg text-gray-700">
                <label
                    className="block mb-2 font-medium text-blue-800"
                    htmlFor="address"
                >
                  Address
                </label>
                <input
                    type="text"
                    name="address"
                    value={info.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="w-full p-2 border border-gray-200 rounded-lg bg-white-100"
                    required
                />
              </div>

              {/* Allergy */}
              <div className="p-0.5 rounded-lg text-gray-700">
                <label
                    className="block mb-2 font-medium text-blue-800"
                    htmlFor="allergy"
                >
                  Allergy
                </label>
                <textarea
                    name="allergy"
                    value={info.allergy}
                    onChange={handleChange}
                    placeholder="Enter allergy info"
                    className="w-full p-2 border border-gray-200 rounded-lg bg-white-100"
                    rows="3"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-center mt-2 space-x-2">
                <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={onClose}
                >
                  Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "hover:bg-blue-600"
                    }`}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Toast Container to show notifications */}
        <ToastContainer />
      </>
  );
};

// Add prop-types for validation
InformationForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InformationForm;
