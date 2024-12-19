import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import InformationForm from "./InformationForm";
import { Api } from "../../utils/api.ts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchForm = ({ isOpen, onClose, onAppointmentCreated }) => {
  const [doctorId, setDoctorId] = useState(null);
  const [isInfoFormOpen, setIsInfoFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(true);

  // Use useMemo to avoid recreating the api instance on every render
  const api = useMemo(() => new Api(), []);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      const account = localStorage.getItem("account");
      if (!account) {
        toast.error("Account is missing. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      try {
        const doctorData = await api.getDoctorByAccount(account);
        const doctorId = doctorData?.doctor_id;
        if (!doctorId) {
          toast.error("Doctor ID is missing from server response.", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
        setDoctorId(doctorId);
      } catch (error) {
        console.error(
            "Error fetching doctor information:",
            error.response?.data || error.message
        );
        toast.error("Failed to fetch doctor information.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    fetchDoctorInfo();
  }, [api]);
  useEffect(() => {
    if (!isOpen && !isInfoFormOpen) {
      setSelectedPatient(null);
      setAppointmentDateTime("");
      setMessage("");
      setSearchTerm("");
    }
  }, [isOpen, isInfoFormOpen]);
  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value.trim();
    setSearchTerm(searchTerm);

    if (searchTerm.length > 0) {
      setIsLoading(true);
      try {
        const results = await api.searchPatient(searchTerm);
        if (results && Array.isArray(results.data)) {
          const patients = results.data.map((result) => ({
            studentId: result.studentId,
            patientName: result.patientName,
            patientId: result.patientId,
          }));
          setSearchResults(patients);
        } else {
          setMessage("Unexpected response format.");
          setSearchResults([]);
        }
      } catch (error) {
        console.error(
            "Error searching for patients. Search term:",
            searchTerm,
            "Error:",
            error.response?.data || error.message
        );
        setMessage("Error searching for patients. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
      setMessage("");
    }
  };

  const handleSelectPatient = (id, name, patientId) => {
    setSelectedPatient({ studentId: id, patientName: name, patientId });
    setSearchTerm(id);
    setSearchResults([]);
    setMessage("");
  };

  const handleCreateAppointment = async () => {
    if (!selectedPatient || !appointmentDateTime) {
      setMessage("Please fill in all fields before creating an appointment.");
      return;
    }

    // Convert appointmentDateTime to a Date object
    const selectedDateTime = new Date(appointmentDateTime);
    const currentDateTime = new Date();

    // Check if the selected appointment date and time is in the past
    if (selectedDateTime < currentDateTime) {
      toast.error("Appointment date and time cannot be in the past.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const appointmentRequest = {
      doctorId,
      patientId: selectedPatient.patientId,
      time: appointmentDateTime,
    };

    try {
      setIsLoading(true);
      await api.createAppointment(appointmentRequest);

      toast.success("Appointment created successfully!", {
        position: "top-right",
        autoClose: 2000, // Close after 2 seconds
        onClose: () => {
          setIsInfoFormOpen(false);
          onClose(); // Close the main pop-up
        },
      });

      // Reset form state
      setSelectedPatient(null);
      setAppointmentDateTime("");
      onAppointmentCreated?.({
        patientName: selectedPatient.patientName,
        studentId: selectedPatient.studentId,
        time: appointmentDateTime,
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      setMessage("Failed to create appointment. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  if (!isOpen && !isInfoFormOpen) return null;

  return (
      <>
        {/* Modal Popup */}
        {isOpen && !isInfoFormOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-7 w-full max-w-lg mx-4 md:mx-0 md:w-1/2">
                <button
                    onClick={onClose}
                    className="text-gray-700 hover:text-gray-900"
                >
                  <FaTimes className="text-xl" />
                </button>
                <h2 className="text-2xl font-semibold text-center text-gray-600 w-full mb-4">
                  Booking Appointment
                </h2>
                <div className="flex justify-center mb-4">
                  {/*<button*/}
                  {/*    className={`px-4 py-2 rounded-l-full ${*/}
                  {/*        isSearchMode*/}
                  {/*            ? "bg-blue-600 text-white"*/}
                  {/*            : "bg-gray-200 text-gray-700"*/}
                  {/*    }`}*/}
                  {/*    onClick={() => setIsSearchMode(true)}*/}
                  {/*>*/}
                  {/*  Search Mode*/}
                  {/*</button>*/}
                  {/*<button*/}
                  {/*    className={`px-4 py-2 rounded-r-full ${*/}
                  {/*        !isSearchMode*/}
                  {/*            ? "bg-blue-600 text-white"*/}
                  {/*            : "bg-gray-200 text-gray-700"*/}
                  {/*    }`}*/}
                  {/*    onClick={() => setIsSearchMode(false)}*/}
                  {/*>*/}
                  {/*  Form Mode*/}
                  {/*</button>*/}
                </div>
                <hr className="mb-4" />

                <h2 className="tblock mb-2 font-medium text-blue-800">
                  Search Patient
                </h2>

                {/* Search */}
                <div className="flex items-center gap-2">
                  <input
                      type="text"
                      placeholder="Enter student ID..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full p-3 pl-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                      onClick={() =>
                          setIsInfoFormOpen(true) && setIsSearchMode(false)
                      }
                      className="bg-blue-500 text-white px-3 py-3 rounded-md hover:bg-blue-600 transition"
                  >
                    Add
                  </button>
                </div>

                {isLoading && <p className="text-blue-500 mt-2">Loading...</p>}

                {message && <p className="text-red-500 mt-2">{message}</p>}

                {/* Results */}
                {searchResults.length > 0 && (
                    <ul className="mt-2 border rounded-md shadow-md max-h-48 overflow-y-auto">
                      {searchResults.map((patient) => (
                          <li
                              key={patient.studentId}
                              className="cursor-pointer p-2 hover:bg-gray-100"
                              onClick={() =>
                                  handleSelectPatient(
                                      patient.studentId,
                                      patient.patientName,
                                      patient.patientId
                                  )
                              }
                          >
                            {patient.patientName} ({patient.studentId})
                          </li>
                      ))}
                    </ul>
                )}

                {/* Selected Patient Info */}
                {selectedPatient && (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <div className="p-0.5 rounded-lg text-gray-700">
                        <label className="block mb-2 font-medium text-blue-800">
                          Full Name
                        </label>
                        <input
                            type="text"
                            value={selectedPatient.patientName}
                            readOnly
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100"
                        />
                      </div>
                      <div className="p-0.5 rounded-lg text-gray-700">
                        <label className="block mb-2 font-medium text-blue-800">
                          Student ID
                        </label>
                        <input
                            type="text"
                            value={selectedPatient.studentId}
                            readOnly
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100"
                        />
                      </div>

                      {/* Appointment Date and Time */}
                      <div className="p-0.5 rounded-lg text-gray-700">
                        <label
                            htmlFor="appointmentDateTime"
                            className="block mb-2 font-medium text-blue-800"
                        >
                          Appointment Date and Time:
                        </label>
                        <input
                            type="datetime-local"
                            id="appointmentDateTime"
                            value={appointmentDateTime}
                            onChange={(e) => setAppointmentDateTime(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                          onClick={handleCreateAppointment}
                          className="mt-4 w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-auto block"
                      >
                        Create Appointment
                      </button>
                    </div>
                )}

                {/* Create Appointment Button */}
              </div>
            </div>
        )}
        <ToastContainer />

        {/* Information Popup */}
        <InformationForm
            isOpen={isInfoFormOpen}
            onClose={() => setIsInfoFormOpen(false)}
        />
      </>
  );
};

// Add prop-types for validation
SearchForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAppointmentCreated: PropTypes.func,
};

export default SearchForm;
