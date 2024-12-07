import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../components/Sidebar.jsx";
import { FiSearch, FiTrash } from "react-icons/fi";
import { Api } from "../../../utils/api.ts";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const MedicalRecord = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [medicationList, setMedicationList] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSections, setActiveSections] = useState([]);
  const [formData, setFormData] = useState({
    treatment: "",
    diagnosis: "",
    suggest: "",
    patient_name: "",
    doctor_name: "",
    medical_record_id: "",
  });
  const [patientInfo, setPatientInfo] = useState({
    allergy: "",
    patient_name: "",
    student_id: "",
    patient_phone: "",
    patient_address: "",
    insurance_number: "",
    insurance_name: "",
    registered_hospital: "",
  });

  const api = new Api();

  // Load patient and doctor information when navigating to this page
  useEffect(() => {
    const loadAppointmentDetails = async () => {
      const appointment = location.state?.appointment;
      if (appointment) {
        setFormData((prev) => ({
          ...prev,
          patient_name: appointment.patient_name || "Unknown Patient",
        }));

        try {
          // Fetch doctor details
          const doctorDetails = await api.getDoctorById(appointment.doctorId);
          setFormData((prev) => ({
            ...prev,
            doctor_name: doctorDetails?.doctor_name || "Unknown Doctor",
          }));

          // Fetch patient information using studentId
          const patientDetails = await api.getPatientInformation(appointment.studentId);
          setPatientInfo({
            allergy: patientDetails?.allergy || "No allergy information",
            patient_name: patientDetails?.patient_name || "N/A",
            student_id: patientDetails?.student_id || "N/A",
            patient_phone: patientDetails?.patient_phone || "N/A",
            patient_address: patientDetails?.patient_address || "N/A",
            insurance_number: patientDetails?.insurance_number || "N/A",
            insurance_name: patientDetails?.insurance_name || "N/A",
            registered_hospital: patientDetails?.registered_hospital || "N/A",
          });

          // Fetch the recordId using the appointmentId
          const record = await api.getRecordByAppointmentId(appointment.appointment_id);
          setFormData((prev) => ({
            ...prev,
            medical_record_id: record?.medical_record_id,
          }));
        } catch (error) {
          console.error("Error fetching details:", error);
          toast.error("Failed to load appointment details.");
        }
      }
    };

    loadAppointmentDetails();
  }, [location.state]);

// Search Medicines
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      setIsLoading(true);
      try {
        const medicines = await api.searchMedicine(query); // Backend response
        console.log("Fetched Medicines:", medicines); // Log response to debug
        setFilteredMedications(medicines.length > 0 ? medicines : []); // Update state
      } catch (error) {
        console.error("Error fetching medicines:", error);
        toast.error("Failed to fetch medicines.");
        setFilteredMedications([]); // Clear suggestions on error
      } finally {
        setIsLoading(false);
      }
    } else {
      setFilteredMedications([]); // Clear suggestions if query is empty
    }
  };


// Add Medicine to List
  const handleSelectMedication = (medicine) => {
    if (!medicationList.some((med) => med.id === medicine.id)) {
      setMedicationList((prev) => [...prev, medicine]);
    }
    setSearchQuery(""); // Clear search
    setFilteredMedications([]); // Clear suggestions
  };

// Remove Medicine from List
  const handleDeleteMedication = (medicineId) => {
    setMedicationList((prev) => prev.filter((med) => med.id !== medicineId));
  };

// Handle Form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

// Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { treatment, diagnosis, suggest, medical_record_id } = formData;

    if (!medical_record_id) {
      toast.error("Record ID not found. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (treatment.trim() && diagnosis.trim() && suggest.trim()) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to save this Medical Record?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, save it!",
        });

        if (result.isConfirmed) {
          const medicalRequest = {
            treatment,
            diagnosis,
            suggest,
            medicines: medicationList.map((med) => med.id), // Send array of medicine IDs
          };

          console.log("Updating Medical Record:", medical_record_id, medicalRequest);

          // Send PATCH request to update medical record
          await api.createMedicalRecord(medical_record_id, medicalRequest);

          toast.success("Medical Record updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error updating medical record:", error);
        toast.error("Failed to update Medical Record. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Please fill all required fields.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-1/5 bg-white shadow-lg">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow p-8 space-y-6">
          <form onSubmit={handleSubmit}>
            {/* Medical Record Form */}
            <div className="bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 shadow-lg rounded-lg p-6">
              <h1 className="text-3xl font-bold text-white mb-6">Medical Record</h1>
              <div className="flex space-x-4 items-end">
                {/* Patient Name */}
                <div className="flex flex-col w-1/2">
                  <label className="text-blue-950 font-medium text-xl">Patient Name</label>
                  <input
                      type="text"
                      name="patient_name"
                      value={formData.patient_name}
                      readOnly
                      className="border border-blue-400 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Patient name will appear here"
                  />
                </div>

                {/* Doctor Name */}
                <div className="flex flex-col w-1/2">
                  <label className="text-blue-900 font-medium text-xl">Doctor Name</label>
                  <input
                      type="text"
                      name="doctor_name"
                      value={formData.doctor_name}
                      readOnly
                      className="border border-blue-400 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Doctor name will appear here"
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-3 gap-6">
              {/* Left Section */}
              <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 space-y-4">
                {/* Diagnosis */}
                <div>
                  <label className="text-blue-700 font-medium text-xl">Diagnosis</label>
                  <textarea
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter illness details"
                      rows="4"
                  />
                </div>

                {/* Treatment */}
                <div>
                  <label className="text-blue-700 font-medium text-xl">Treatment</label>
                  <textarea
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter treatment details"
                      rows="4"
                  />
                </div>

                {/* Prescription */}
                <div>
                  <label className="text-blue-700 font-medium text-xl">Prescription</label>
                  <div className="relative w-full">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"/>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {isLoading && <p className="text-gray-500 mt-2">Loading...</p>}
                    {!isLoading && filteredMedications.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-2 shadow-lg">
                          {filteredMedications.map((medicine) => {
                            console.log("Rendering Medicine:", medicine); // Log each medicine
                            return (
                                <li
                                    key={medicine.id}
                                    className="p-2 hover:bg-blue-100 cursor-pointer"
                                    onClick={() => handleSelectMedication(medicine)}
                                >
                                  {medicine.name}
                                </li>
                            );
                          })}
                        </ul>
                    )}

                  </div>
                </div>

                {/* Medication List */}
                <ul className="mt-4 space-y-2">
                  {medicationList.map((medicine) => (
                      <li
                          key={medicine.id} // Use id as the unique key
                          className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow overflow-auto"
                      >
                        <div>
                          <strong>{medicine.name}</strong> {/* Display the name */}
                        </div>
                        <FiTrash
                            className="text-red-500 text-xl cursor-pointer hover:text-red-700"
                            onClick={() => handleDeleteMedication(medicine.id)} // Delete by id
                        />
                      </li>
                  ))}
                </ul>


                {/* Suggestion Box */}
                <div className="mt-4">
                  <label className="text-blue-700 font-medium text-xl">Suggestions</label>
                  <textarea
                      name="suggest"
                      value={formData.suggest}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      placeholder="Add any suggestions here..."
                      rows="4"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="col-span-1 bg-white shadow-lg rounded-lg p-6 space-y-4">
                {/* Patient Information, Allergy, Latest Record Buttons */}
                <div className="flex flex-col space-y-4">
                  {/* Patient Information */}
                  <button
                      className="bg-blue-100 text-blue-700 font-medium text-xl rounded-lg p-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-200"
                      // onClick={() => toggleSection("patientInfo")}
                  >
                    Patient Information
                  </button>
                  {activeSections.includes("patientInfo") && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-inner">
                        <p className="text-gray-700">
                          <strong>Full Name:</strong> {patientInfo.patient_name}
                        </p>
                        <p className="text-gray-700">
                          <strong>Student ID:</strong> {patientInfo.student_id}
                        </p>
                        <p className="text-gray-700">
                          <strong>Phone:</strong> {patientInfo.patient_phone}
                        </p>
                        <p className="text-gray-700">
                          <strong>Address:</strong> {patientInfo.patient_address}
                        </p>
                      </div>
                  )}

                  {/* Allergy */}
                  <button
                      className="bg-blue-100 text-blue-700 font-medium text-xl rounded-lg p-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-200"
                      onClick={() => toggleSection("allergy")}
                  >
                    Allergy
                  </button>
                  {activeSections.includes("allergy") && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-inner">
                        <p className="text-gray-700">{patientInfo.allergy}</p>
                      </div>
                  )}

                  {/* Insurance */}
                  <button
                      className="bg-blue-100 text-blue-700 font-medium text-xl rounded-lg p-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-200"
                      onClick={() => toggleSection("insurance")}
                  >
                    Insurance
                  </button>
                  {activeSections.includes("insurance") && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-inner">
                        <p className="text-gray-700">
                          <strong>Insurance Name:</strong> {patientInfo.insurance_name}
                        </p>
                        <p className="text-gray-700">
                          <strong>Insurance Number:</strong> {patientInfo.insurance_number}
                        </p>
                        <p className="text-gray-700">
                          <strong>Registered Hospital:</strong> {patientInfo.registered_hospital}
                        </p>
                      </div>
                  )}

                  {/* Latest Record */}
                  <button
                      className="bg-blue-100 text-blue-700 font-medium text-xl rounded-lg p-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-200"
                      onClick={() => toggleSection("latestRecord")}
                  >
                    Latest Record
                  </button>
                  {activeSections.includes("latestRecord") && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-inner">
                        <p className="text-gray-700">{patientInfo.latestRecord}</p>
                      </div>
                  )}
                </div>
              </div>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold mt-4"
            >
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
  );
};

export default MedicalRecord;
