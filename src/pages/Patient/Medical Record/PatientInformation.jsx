import { useState } from "react";
import { Api } from "../../../utils/api.ts";

const PatientInformation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api = new Api();

  // To search patient
  const fetchPatientInfo = async () => {
    setLoading(true);
    setError("");
    setPatientInfo(null);

    if (!searchQuery.trim()) {
      setError("Please enter a valid Student ID.");
      setLoading(false);
      return;
    }

    try {
      const data = await api.getPatient(searchQuery.trim());
      if (data) {
        setPatientInfo(data); // save
      } else {
        setError("No patient found with the provided Student ID.");
      }
    } catch (err) {
      console.error("Error fetching patient information:", err);
      setError("Failed to fetch patient information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
      <h2 className="font-medium text-xl text-blue-700">
        Search Patient Information
      </h2>

      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Student ID to Search"
      />
      <button
        onClick={fetchPatientInfo}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md shadow hover:bg-blue-600"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg shadow">
          <p>{error}</p>
        </div>
      )}

      {/* Show */}
      {patientInfo && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="text-lg font-bold text-blue-700 mb-2">
            Patient Information:
          </h3>
          <p>
            <strong>Name:</strong> {patientInfo.name}
          </p>
          <p>
            <strong>Student ID:</strong> {patientInfo.studentId}
          </p>
          <p>
            <strong>Phone:</strong> {patientInfo.phone}
          </p>
          <p>
            <strong>Address:</strong> {patientInfo.address}
          </p>
          <p>
            <strong>Major:</strong> {patientInfo.major}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientInformation;
