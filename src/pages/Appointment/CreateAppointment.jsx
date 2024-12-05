import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Api } from "../../utils/api";

const CreateAppointment = ({ appointments, setAppointments }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [allergy, setAllergy] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [availableTimes, setAvailableTimes] = useState([
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ]);

  const api = new Api();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = async (e) => {
    console.log("Event:", e);
    if (!e || !e.target) return;
    const searchTerm = e.target.value.trim();
    setSearchTerm(searchTerm);

    if (searchTerm.length > 0) {
      setIsLoading(true);
      try {
        const results = await api.searchPatient(searchTerm);
        console.log("API Results:", results);

        // Ensure results.data is an array
        if (results && Array.isArray(results.data)) {
          console.log("Results Data:", results.data);
          results.data.forEach((result, index) => {
            console.log(`Result ${index}:`, result);
          });
          //        setSearchResults(results.data);
          const patients = results.data.map((result) => ({
            studentId: result.studentId,
            patientName: result.patientName,
          }));
          setSearchResults(patients);
          console.log("Patients:", patients);
          patients.forEach((patient) => {
            console.log("Student ID:", patient.studentId);
            console.log("Patient Name:", patient.patientName);
          });
        } else {
          console.error("Expected an array but got:", results);
          setMessage("Unexpected response format.");
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching for Student IDs:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        setSearchResults([]);
        setMessage("Error searching for Student IDs.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  // Handle Adding a New Patient in Form mode
  const handleAddPatient = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !studentId || !phone || !address) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      // Log the data you're about to send
      console.log("Sending patient data:", {
        name,
        address,
        major,
        phone,
        studentId,
        allergy,
      });

      // Call the createPatient API
      const patientResponse = await api.createPatient(
        name,
        address,
        major,
        phone,
        studentId,
        allergy
      );
      console.log("Patient response:", patientResponse);
      if (patientResponse) {
        alert("Update successfully");
        // Reset form fields if needed
        setName("");
        setStudentId("");
        setMajor("");
        setPhone("");
        setAddress("");
        setAllergy("");
      } else {
        alert("Error updating information");
      }
    } catch (error) {
      console.error("Error adding patient:", error);

      // Log detailed error information if available
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data);
      }

      alert("Error updating information");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearchChange(searchTerm);
  }, [searchTerm, handleSearchChange]);

  useEffect(() => {
    handleSearchChange(searchTerm);
  }, [searchTerm, handleSearchChange]);
  // Handle Search Input Change

  // Handle Selecting a Student ID from Dropdown
  const handleSelectStudentId = async (id) => {
    setSearchTerm(id);
    setSearchResults([]);
    setIsLoading(true);
    try {
      const result = await api.getPatientInformation(id);
      if (result) {
        setName(result.name);
        setStudentId(result.studentId);
        setMajor(result.major);
        setPhone(result.phone);
        setAddress(result.address);
        setAllergy(result.allergy);
        setIsSearchMode(true); // Stay in Search Mode
        setMessage("");
      } else {
        setMessage("This student ID does not exist.");
        // Optionally, you can prompt the user to add a new patient here
      }
    } catch (error) {
      console.error("Error fetching patient information:", error);
      setMessage("Error fetching patient information.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await api.login(credentials);
      const account = response.data.account;
      localStorage.setItem("account", JSON.stringify(account));
      // Proceed with login success actions
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
    }
  };
  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      setMessage("Please select both date and time.");
      return;
    }

    setIsLoading(true);
    try {
      // Fetch doctorID using getDoctorByAccount API
      const account = localStorage.getItem("account");
      const doctorResponse = await api.getDoctorByAccount(account);
      const doctorId = doctorResponse.doctor_id;

      // Validate doctorId
      if (!doctorId || typeof doctorId !== "number") {
        setMessage("Invalid doctor ID.");
        setIsLoading(false);
        return;
      }

      // Validate studentId
      const patientResponse = await api.getPatient(studentId);
      const patientId = patientResponse.patientId;

      // Validate patientId
      if (!patientId) {
        setMessage("Invalid patient ID.");
        setIsLoading(false);
        return;
      }

      // Log the request payload
      const payload = {
        doctorId,
        patientId, // Ensure patientId is sent as a string
        time: `${date}T${time}`,
      };
      console.log("Request Payload:", payload);

      // Create the appointment
      const appointmentResponse = await api.createAppointment(
        doctorId,
        patientId, // Ensure patientId is sent as a string
        `${date}T${time}`
      );
      // Store appointmentId in localStorage
      if (appointmentResponse.appointmentId) {
        localStorage.setItem(
          "appointmentId",
          appointmentResponse.appointmentId
        );
      }

      if (appointmentResponse) {
        alert("Appointment successfully created");

        setAppointments([
          ...appointments,
          {
            name,
            studentId,
            date,
            time,
            doctorId,
            patientId,
            status: "APPROVED",
            appointmentId: appointmentResponse.appointmentId,
          },
        ]);
        resetForm();
      } else {
        setMessage("Failed to create appointment.");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setMessage("An error occurred while creating the appointment.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Form Function
  const resetForm = () => {
    setIsSearchMode(true);
    setSearchTerm("");
    setSearchResults([]);
    setMessage("");
    setName("");
    setStudentId("");
    setMajor("");
    setPhone("");
    setAddress("");
    setAllergy("");
    setDate("");
    setTime("");
    setIsLoading(false);
  };

  // Toggle Modal Visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    resetForm();
  };

  return (
    <>
      {/* Button to Open Modal */}
      <div className="fixed top-60 right-2 w-1/6 h-10 flex items-center justify-center">
        <button
          className="h-8 w-80 mr-10 bottom-20 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-orange-800 transition-colors duration-300"
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create Appointment
        </button>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-xl p-7 w-full max-w-lg mx-4 md:mx-0 md:w-1/2">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-center text-gray-600 w-full">
                Booking Appointment
              </h2>
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={toggleModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mode Toggle Buttons */}
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
              <button
                className={`px-4 py-2 rounded-r-full ${
                  !isSearchMode
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setIsSearchMode(false)}
              >
                Form Mode
              </button>
            </div>

            {/* Divider */}
            <hr className="mb-4" />

            {/* Conditional Rendering: Search Form or Add Patient Form */}
            {isSearchMode ? (
              // **Search Form JSX**
              <form
                onSubmit={handleCreateAppointment}
                className="grid grid-cols-1 gap-4"
              >
                {/* Search Student ID */}
                <div className="p-1 rounded-lg text-gray-700" ref={dropdownRef}>
                  <label className="block mb-2 font-medium text-blue-800">
                    Search Student ID
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute left-3 top-4 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Enter Student ID"
                      value={searchTerm}
                      onChange={handleSearchChange} // Pass the function directly
                      className="w-full p-3 pl-10 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {Array.isArray(searchResults) &&
                      searchResults.length > 0 && (
                        <div className="absolute bg-white border border-gray-200 rounded-lg w-full mt-1 max-h-60 overflow-auto z-10">
                          {searchResults.map((patient, index) => (
                            <div
                              key={index}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setStudentId(patient.studentId);
                                setName(patient.patientName);
                                setMajor(patient.major);
                                setPhone(patient.phone);
                                setAddress(patient.address);
                                setAllergy(patient.allergy);
                                setSearchResults([]);
                              }}
                            >
                              {patient.studentId ? patient.studentId : "No ID"}{" "}
                              -{" "}
                              {patient.patientName
                                ? patient.patientName
                                : "No Name"}{" "}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`text-${
                      message.includes("Error") || message.includes("No")
                        ? "red"
                        : "green"
                    }-500`}
                  >
                    {message}
                  </div>
                )}

                {/* Display Selected Student Info and Appointment Details */}
                {studentId && (
                  <>
                    {/* Full Name */}
                    <div className="p-0.5 rounded-lg text-gray-700">
                      <label className="block mb-2 font-medium text-blue-800">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        readOnly
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100"
                      />
                    </div>

                    {/* Student ID */}
                    <div className="p-0.5 rounded-lg text-gray-700">
                      <label className="block mb-2 font-medium text-blue-800">
                        Student ID
                      </label>
                      <input
                        type="text"
                        value={studentId}
                        readOnly
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100"
                      />
                    </div>

                    {/* Allergy */}
                    <div className="p-0.5 rounded-lg text-gray-700">
                      <label className="block mb-2 font-medium text-blue-800">
                        Allergy
                      </label>

                      <textarea
                        name="allergy"
                        value={allergy}
                        className="w-full p-3 border border-blue-200 rounded-lg bg-white-100"
                        onChange={(e) => setAllergy(e.target.value)}
                        placeholder="Enter allergies"
                        rows="3"
                        cols="50"
                      ></textarea>
                    </div>
                    <div className="flex space-x-10">
                      {/* Select Date */}
                      <div className="p-0.5 rounded-lg text-gray-700">
                        <label className="block mb-2 font-medium text-blue-800">
                          Select Date
                        </label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                          className="w-full p-3 px-8 py-1 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Select Time */}
                      <div className="p-0.5 rounded-lg text-gray-700">
                        <label className="block mb-2 right-4 font-medium text-blue-800">
                          Select Time
                        </label>
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          required
                          className="w-full p-2 px-10 py-1.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" disabled>
                            Select Time
                          </option>
                          {availableTimes.length > 0 ? (
                            availableTimes.map((t, index) => (
                              <option key={index} value={t}>
                                {t}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>
                              No available times
                            </option>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center space-x-4">
                      <button
                        type="submit"
                        className={`bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors duration-300 ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating..." : "Create Appointment"}
                      </button>
                    </div>
                  </>
                )}
              </form>
            ) : (
              // **Add Patient Form JSX**
              <form
                onSubmit={handleAddPatient}
                className="grid grid-cols-1 gap-4"
              >
                {/* Full Name */}
                <div className="p-0.5 rounded-lg text-gray-700">
                  <label className="block mb-2 font-medium text-blue-800">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter student's full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Student ID */}
                <div className="p-0.5 rounded-lg text-gray-700">
                  <label className="block mb-2 font-medium text-blue-800">
                    Student ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  {/* Major */}
                  <div className="p-0.5 rounded-lg text-gray-700">
                    <label className="block mb-2 font-medium text-blue-800">
                      Major
                    </label>
                    <input
                      type="text"
                      placeholder="Enter major"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="p-0.5 rounded-lg text-gray-700">
                    <label className="block mb-2 font-medium text-blue-800">
                      Phone
                    </label>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {/* Address */}
                <div className="p-0.5 rounded-lg text-gray-700">
                  <label className="block mb-2 font-medium text-blue-800">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Allergy */}
                <div className="p-0.5 rounded-lg text-gray-700">
                  <label className="block mb-2 font-medium text-blue-800">
                    Allergy
                  </label>
                  <input
                    type="text"
                    placeholder="Enter allergy information"
                    value={allergy}
                    onChange={(e) => setAllergy(e.target.value)}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                    onClick={() => setIsSearchMode(true)}
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 mb-1 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add"}
                  </button>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`text-${
                      message.includes("successfully") ? "green" : "red"
                    }-500`}
                  >
                    {message}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAppointment;
