// src/components/CreateAppointment.jsx
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Api } from "../../utils/api";

const CreateAppointment = ({ appointments, setAppointments }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Changed to array
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [allergy, setAllergy] = useState(""); // Added allergy state
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [matchedStudentIds, setMatchedStudentIds] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const dropdownRef = useRef(null);

  const api = new Api();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMatchedStudentIds([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (date) {
      const generateAvailableTimes = () => {
        const startTime = 8 * 60; // 8:00 AM in minutes
        const endTime = 18 * 60; // 6:00 PM in minutes
        const interval = 15; // 15 minutes interval
        const times = [];

        for (let minutes = startTime; minutes <= endTime; minutes += interval) {
          const hrs = Math.floor(minutes / 60);
          const mins = minutes % 60;
          const timeString = `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}`;
          times.push(timeString);
        }

        return times;
      };

      const allTimes = generateAvailableTimes();

      const existingAppointments = appointments.filter(
        (app) => app.date === date
      );

      const unavailableTimes = [];

      existingAppointments.forEach((app) => {
        const appTime = app.time;
        const [appHours, appMinutes] = appTime.split(":").map(Number);
        const appTotalMinutes = appHours * 60 + appMinutes;

        // Add time slots within 30 minutes before and after
        for (let diff = -30; diff <= 30; diff += 15) {
          const conflictedMinutes = appTotalMinutes + diff;
          if (conflictedMinutes >= 0 && conflictedMinutes <= 24 * 60) {
            const conflictedHours = Math.floor(conflictedMinutes / 60);
            const conflictedMins = conflictedMinutes % 60;
            const conflictedTime = `${conflictedHours
              .toString()
              .padStart(2, "0")}:${conflictedMins.toString().padStart(2, "0")}`;
            unavailableTimes.push(conflictedTime);
          }
        }
      });

      const filteredTimes = allTimes.filter(
        (t) => !unavailableTimes.includes(t)
      );
      setAvailableTimes(filteredTimes);
    } else {
      setAvailableTimes([]);
    }
  }, [date, appointments]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsSearchMode(true);
    setSearchTerm("");
    setSearchResults([]);
    setMessage("");
    setName("");
    setStudentId("");
    setMajor("");
    setPhone("");
    setAddress("");
    setAllergy(""); // Clear allergy state
    setDate("");
    setTime("");
    setMatchedStudentIds([]);
  };

  const toggleMode = () => {
    setIsSearchMode(!isSearchMode);
    setMessage("");
    setSearchResults([]);
    setSearchTerm("");
    setMatchedStudentIds([]);
    // Clear form fields when switching modes
    setName("");
    setStudentId("");
    setMajor("");
    setPhone("");
    setAddress("");
    setAllergy("");
    setDate("");
    setTime("");
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      try {
        const result = await api.getPatientInformation(value);
        if (result) {
          setSearchResults([result]); // Assuming single result; adjust if multiple
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error during search:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectStudentId = async (id) => {
    setSearchTerm(id);
    setMatchedStudentIds([]);

    try {
      const result = await api.getPatientInformation(id);
      if (result) {
        setName(result.name);
        setStudentId(result.studentID);
        setMajor(result.major);
        setPhone(result.phone);
        setAddress(result.address);
        setAllergy(result.allergy);
        setMessage("");
      } else {
        setMessage("This information does not exist.");
        setName("");
        setStudentId("");
        setMajor("");
        setPhone("");
        setAddress("");
        setAllergy("");
      }
    } catch (error) {
      console.error("Error fetching patient information:", error);
      setMessage("This information does not exist.");
      setName("");
      setStudentId("");
      setMajor("");
      setPhone("");
      setAddress("");
      setAllergy("");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm) {
      try {
        const result = await api.getPatientInformation(searchTerm);
        if (result) {
          setName(result.name);
          setStudentId(result.studentID);
          setMajor(result.major);
          setPhone(result.phone);
          setAddress(result.address);
          setAllergy(result.allergy);
          setMessage("");
          setSearchResults([result]);
        } else {
          setMessage("This information does not exist.");
          setSearchResults([]);
          setIsSearchMode(false); // Switch to Form mode
        }
      } catch (error) {
        console.error("Error fetching patient information:", error);
        setMessage("This information does not exist.");
        setSearchResults([]);
        setIsSearchMode(false); // Switch to Form mode
        setStudentId(searchTerm);
      }
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();

    const patientData = {
      name,
      address,
      major,
      phone,
      studentID: studentId,
      allergy,
    };

    try {
      await api.createPatient(patientData);
      alert("Update information successfully"); // Alert upon successful addition
      setMessage("Patient information saved successfully");
      setIsSearchMode(true);
      // Clear form
      setName("");
      setStudentId("");
      setMajor("");
      setPhone("");
      setAddress("");
      setAllergy("");
      setDate("");
      setTime("");
      setSearchResults([]);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error saving patient information");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      setMessage("Please select both date and time.");
      return;
    }

    // Combine date and time into a single Date object
    const newAppointmentDateTime = new Date(`${date}T${time}`);

    // Check for time conflicts
    const isConflict = appointments.some((appointment) => {
      if (appointment.date === date) {
        const existingAppointmentDateTime = new Date(
          `${appointment.date}T${appointment.time}`
        );
        const diffInMs = Math.abs(
          existingAppointmentDateTime - newAppointmentDateTime
        );
        const diffInMinutes = diffInMs / (1000 * 60);
        return diffInMinutes < 30;
      }
      return false;
    });

    if (isConflict) {
      setMessage(
        "The selected time slot is not available. Please choose a different time."
      );
      return;
    }

    if (isSearchMode) {
      if (studentId && name) {
        console.log("Appointment created for existing student:", {
          studentId,
          name,
          date,
          time,
        });

        // Add new appointment to the state
        const newAppointment = { name, studentId, date, time };
        setAppointments([...appointments, newAppointment]);

        alert("Appointment successfully created"); // Alert upon successful appointment creation

        // Clear form fields after submission
        setName("");
        setStudentId("");
        setTime("");
        setDate("");
        setMessage("");
      } else {
        setMessage("No student selected. Please search for a student.");
      }
    } else {
      await handleAddPatient(e);
      // Ensure patient is added before creating appointment

      // Add new appointment to the state
      const newAppointment = { name, studentId, date, time };
      setAppointments([...appointments, newAppointment]);

      alert("Appointment successfully created"); // Alert upon successful appointment creation
    }

    // Optionally, close the modal after submission
    toggleModal();
  };

  return (
    <>
      <div className="fixed top-60 right-2 w-1/6 h-10 flex items-center justify-center">
        <button
          className="h-8 w-80 mr-10 bottom-20 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-orange-800 transition-colors duration-300"
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create Appointment
        </button>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-xl p-7 w-full max-w-lg mx-4 md:mx-0 md:w-1/2">
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
            <hr className="mb-4" />
            {isSearchMode ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-1">
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
                      <ul className="absolute left-0 right-0 border border-blue-200 rounded-lg mt-1 max-h-40 overflow-y-auto bg-white z-50">
                        {searchResults.map((patient) => (
                          <li
                            key={patient.studentID}
                            onClick={() =>
                              handleSelectStudentId(patient.studentID)
                            }
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {patient.name} ({patient.studentID})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {message && <div className="p-1 text-red-500">{message}</div>}
                {studentId && name && (
                  <>
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
                    <div className="p-0.5 rounded-lg text-gray-700 ">
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
                    <div className="p-0.5 rounded-lg text-gray-700 ">
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
                    <div className="p-0.5 rounded-lg text-gray-700 ">
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
                    <div className="p-0.5 rounded-lg text-gray-700 ">
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
                    <div className="flex justify-center space-x-4">
                      <button
                        type="button"
                        className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                        onClick={toggleMode}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors duration-300"
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
                {!studentId && (
                  <div className="flex justify-center space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors duration-300"
                    >
                      Search
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <form
                onSubmit={handleAddPatient}
                className="grid grid-cols-1 gap-1"
              >
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
                <div className="p-0.5 rounded-lg text-gray-700 ">
                  <label className="block mb-2 font-medium text-blue-800">
                    Student ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
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
                <div className="flex justify-center space-x-4 mb-1">
                  <button
                    type="button"
                    className="bg-gray-600 mb-1 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                    onClick={toggleMode}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 mb-1 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors duration-300"
                  >
                    Add
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAppointment;
