import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Api } from "../../utils/api";
import debounce from "lodash.debounce";

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

  // Debounced Search Function
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      if (value.length === 0) {
        setSearchResults([]);
        setMessage("");
        return;
      }

      try {
        // Search patient by studentId
        const results = await api.searchPatient(value);
        if (results && results.length > 0) {
          setSearchResults(results);
          setMessage("");
          setIsSearchMode(true);
        } else {
          // No matching Student IDs found, create new patient
          const newPatientData = { studentId: value };
          const newPatient = await api.createPatient(newPatientData);

          if (newPatient) {
            // Get basic information of the new patient
            const patientInfo = await api.getPatientInformation(newPatient.id);
            setSearchResults([patientInfo]);
            setMessage("");
            setIsSearchMode(true);
          } else {
            setSearchResults([]);
            setMessage("Error creating new patient.");
          }
        }
      } catch (error) {
        console.error("Error handling patient search:", error);
        setSearchResults([]);
        setMessage("Error processing request.");
      }
    }, 500),
    []
  );
  const handleSearch = useCallback(
    debounce(async (term) => {
      if (term.length === 0) {
        setSearchResults([]);
        setMessage("");
        return;
      }
      setIsLoading(true);
      try {
        const results = await api.searchPatient(term);
        if (results.length === 0) {
          setSearchResults([]);
          setMessage("No matching Student IDs found.");
        } else {
          setSearchResults(results);
          setMessage("");
        }
      } catch (error) {
        console.error("Error searching for Student IDs:", error);
        setSearchResults([]);
        setMessage("Error searching for Student IDs.");
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);
  // Handle Search Input Change
  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
    setMessage("");
    debouncedSearch(value);
  };

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

  // Handle Adding a New Patient
  const handleAddPatient = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !studentId || !phone || !address) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const patientResponse = await api.createPatient(
        name,
        address,
        major,
        phone,
        studentId,
        allergy
      );

      if (patientResponse && patientResponse.studentId) {
        alert("Update successful");
        resetForm();
        setIsSearchMode(true);
      } else {
        setMessage("Failed to add patient.");
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      setMessage("Error adding patient.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Creating an Appointment
  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      setMessage("Please select both date and time.");
      return;
    }

    // Combine date and time into a Date object
    const newAppointmentDateTime = new Date(`${date}T${time}`);
    // Check for time conflicts (example: 30-minute buffer)
    const isConflict = appointments.some((appointment) => {
      const existingAppointmentDateTime = new Date(
        `${appointment.date}T${appointment.time}`
      );
      return (
        Math.abs(existingAppointmentDateTime - newAppointmentDateTime) <
        30 * 60 * 1000
      ); // 30 minutes
    });

    if (isConflict) {
      setMessage(
        "The selected time slot is not available. Please choose a different time."
      );
      return;
    }

    setIsLoading(true);
    try {
      let patientIdToUse = studentId;

      if (!isSearchMode) {
        // Ensure the patient is added before creating the appointment
        await handleAddPatient(e);
        patientIdToUse = studentId; // Update with new studentId
      }

      // Retrieve doctorId from localStorage or context
      const doctorId = localStorage.getItem("doctorId"); // Adjust as needed
      if (!doctorId) {
        setMessage("Doctor ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      // Create the appointment
      const appointmentResponse = await api.createAppointment(
        doctorId,
        patientIdToUse,
        time
      );

      if (appointmentResponse && appointmentResponse.success) {
        alert("Appointment successfully created");
        // Update appointments state
        setAppointments([...appointments, { name, studentId, date, time }]);
        resetForm();
        setIsModalVisible(false); // Close the modal
      } else {
        setMessage("Failed to create appointment.");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setMessage("Error creating appointment.");
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
                      onChange={handleSearchChange}
                      className="w-full p-3 pl-10 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {searchResults.length > 0 && (
                      <div className="absolute bg-white border border-gray-200 rounded-lg w-full mt-1 max-h-60 overflow-auto z-10">
                        {searchResults.map((result) => (
                          <div
                            key={result.studentId}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handleSelectStudentId(result.studentId)
                            }
                          >
                            {result.studentId} - {result.name}
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
                {studentId && name && (
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
                      <input
                        type="text"
                        value={allergy}
                        readOnly
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100"
                      />
                    </div>

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
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                    {/* Select Time */}
                    <div className="p-0.5 rounded-lg text-gray-700">
                      <label className="block mb-2 font-medium text-blue-800">
                        Select Time
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

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
