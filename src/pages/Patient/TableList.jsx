import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import Sidebar from "../../components/Sidebar.jsx";
import { Api } from "../../utils/api.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import appointment from "../Home/Appointment.jsx";

const TableList = () => {
  const [patientsCount, setPatientsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [patientRecords, setPatientRecords] = useState([]);
  const [selectedPatientInfo, setSelectedPatientInfo] = useState(null);
  const [appointmentId, setAppointmentId] = useState("");
  const navigate = useNavigate();
  const api = useMemo(() => new Api(), []);

  // Fetch patient records by patientId
  const fetchPatientRecords = async (patientId) => {
    setLoading(true);
    try {
      if (!patientId) {
        console.error("Patient ID is undefined.");
        toast.error(
            "Failed to fetch patient records due to missing Patient ID."
        );
        return;
      }

      // Fetch records from the API
      const records = await api.getRecordByPatientId(patientId);
      console.log("Patient Records Response:", records);

      if (!records || records.length === 0) {
        toast.info("No records found for this patient.");
        setPatientRecords([]);
        setPatientsCount(0);
        return;
      }

      // Format records for display
      const formattedRecords = records.map((record, index) => {
        const dateTime = record.date || "N/A";
        const [date, time] =
            dateTime !== "N/A" ? dateTime.split("T") : ["N/A", "N/A"];
        const formattedTime = time ? time.split(".")[0] : "N/A";

        console.log("Appointment ID:", record.appointment_id);

        return {
          no: index + 1,
          date: date,
          time: formattedTime,
          diagnosis: record.diagnosis || "N/A",
          treatment: record.treatment || "N/A",
          appointmentId: record.appointment_id || "N/A", // Use the correct field name for appointmentId
        };
      });

      // Set the patient records and appointment ID
      setPatientRecords(formattedRecords);
      setPatientsCount(formattedRecords.length);

      console.log("Formatted Records:", formattedRecords);
    } catch (error) {
      console.error("Error fetching patient records:", error.message);
      toast.error("Failed to fetch patient records.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch patient suggestions based on query
  const fetchPatientSuggestions = async (query) => {
    setLoading(true);
    try {
      const results = await api.searchPatient(query);
      if (results?.data?.length > 0) {
        setSearchResults(
            results.data.map((patient) => ({
              studentId: patient.studentId,
              patientName: patient.patientName,
            }))
        );
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching patient suggestions:", error.message);
      toast.error("Failed to fetch suggestions.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);

    if (query.length > 0) {
      fetchPatientSuggestions(query);
    } else {
      setSearchResults([]);
    }
  };

  // Handle patient selection
  const handleSelectPatient = async (patient) => {
    setLoading(true);
    try {
      // Fetch patient info using studentId
      const patientInfo = await api.searchPatient(patient.studentId);
      console.log("Patient Info Response:", patientInfo);

      // Safely extract patientId
      const patientId = patientInfo?.data?.[0]?.patientId;

      // Check if patientId exists
      if (!patientId) {
        toast.error("Patient ID not found.");
        return;
      }

      console.log("Extracted patientId:", patientId);

      // Update selected patient information
      const selectedPatient = patientInfo.data[0];
      setSelectedPatientInfo({
        name: selectedPatient.patientName || "Unknown",
        studentId: selectedPatient.studentId || "Unknown",
      });

      // Fetch patient records using patientId
      await fetchPatientRecords(patientId);

      // Update UI state
      setSearchQuery(patient.studentId);
      setSearchResults([]);
    } catch (error) {
      console.error("Error fetching patient info or records:", error.message);
      toast.error("Failed to fetch patient information or records.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (appointmentId) => {
    if (!appointmentId || appointmentId === "N/A") {
      toast.error("No appointment ID available for this record.");
      return;
    }

    try {
      // Fetch specific record using appointmentId
      const specificRecord = await api.getRecordByAppointmentId(appointmentId);
      console.log("Fetched Appointment Record:", specificRecord);

      // Navigate to the detailed page with the fetched record
      navigate("/medicalRecord", { state: { appointment: specificRecord } });
    } catch (error) {
      console.error("Error fetching appointment record:", error.message);
      toast.error("Failed to fetch appointment record.");
    }
  };

  return (
      <div className="flex min-h-screen">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="flex-grow flex justify-center items-start py-28 px-4">
          <div className="w-full max-w-5xl bg-white border-l-4 border-blue-500 rounded-lg shadow-lg p-10">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-4 rounded-full flex items-center justify-center">
                  <IoPerson className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">
                    Patients
                  </h1>
                  <p className="text-gray-500 text-base">{patientsCount}</p>
                </div>
              </div>
            </div>
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="flex items-center">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                <input
                    type="text"
                    placeholder="Search by Student ID..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
              {searchResults.length > 0 && (
                  <ul className="absolute z-10 bg-white border rounded-md shadow-lg mt-2 w-full max-h-48 overflow-y-auto">
                    {searchResults.map((result) => (
                        <li
                            key={result.studentId}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleSelectPatient(result)}
                        >
                          {result.patientName} ({result.studentId})
                        </li>
                    ))}
                  </ul>
              )}
            </div>
            {/* Patient Records */}
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-blue-100">
                  <th className="px-6 py-4 text-gray-700 font-semibold">No.</th>
                  <th className="px-6 py-4 text-gray-700 font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold">
                    Time
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold">
                    Diagnosis
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold">
                    Treatment
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold">
                    View Detail
                  </th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                      <td
                          colSpan="6"
                          className="text-center py-10 text-gray-500 italic"
                      >
                        Loading...
                      </td>
                    </tr>
                ) : patientRecords.length > 0 ? (
                    patientRecords.map((record, index) => (
                        <tr key={record.no} className="border-b">
                          <td className="px-6 py-4">{record.no}</td>
                          <td className="px-6 py-4">{record.date}</td>
                          <td className="px-6 py-4">{record.time}</td>
                          <td className="px-6 py-4">{record.diagnosis}</td>
                          <td className="px-6 py-4">{record.treatment}</td>
                          <td className="px-6 py-4">
                            <button
                                onClick={() => handleViewDetail(record.appointmentId)}
                                className="text-blue-500 hover:text-blue-700 font-semibold underline"
                            >
                              View Detail
                            </button>
                          </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td
                          colSpan="6"
                          className="text-center py-10 text-gray-500 italic"
                      >
                        No medical records available
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TableList;