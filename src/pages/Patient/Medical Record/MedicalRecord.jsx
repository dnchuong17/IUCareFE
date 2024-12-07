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
    medical_record_id: "",
    date: "",
    appointment_id: "",
    appointment_time: "",
    appointment_status: "",
    doctorId: "",
    patientId: "",
    medicines: [],
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

  useEffect(() => {
    const loadAppointmentDetails = async () => {
      const appointment = location.state?.appointment;
      if (appointment) {
        try {
          const [doctorDetails, patientDetails, record] = await Promise.all([
            api.getDoctorById(appointment.doctorId),
            api.getPatientInformation(appointment.studentId),
            api.getDetailByRecordId(appointment.appointment_id), // Use your existing function
          ]);

          setFormData((prev) => ({
            ...prev,
            patient_name: patientDetails?.patient_name || "Unknown Patient",
            doctor_name: doctorDetails?.doctor_name || "Unknown Doctor",
            treatment: record?.treatment || "",
            diagnosis: record?.diagnosis || "",
            suggest: record?.suggest || "",
            medical_record_id: record?.medical_record_id || "",
            date: record?.date || appointment.appointment_time || "",
            appointment_id: appointment.appointment_id || "",
            appointment_time: appointment.appointment_time || "",
            appointment_status: appointment.appointment_status || "",
            doctorId: doctorDetails?.doctorId || appointment.doctorId || "",
            patientId: patientDetails?.patientId || appointment.patientId || "",
            medicines: record?.name_medicine || [],
          }));

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
        } catch (error) {
          console.error("Error fetching details:", error);
          toast.error("Failed to load appointment details.");
        }
      }
    };

    loadAppointmentDetails();
  }, [location.state]);

  const toggleSection = (section) => {
    setActiveSections((prev) =>
        prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      setIsLoading(true);
      try {
        const medicines = await api.searchMedicine(query); // Search backend API
        setFilteredMedications(medicines.length > 0 ? medicines : []);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        toast.error("Failed to fetch medicines.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setFilteredMedications([]);
    }
  };

  const handleSelectMedication = (medicine) => {
    if (!medicationList.some((med) => med.id === medicine.id)) {
      setMedicationList((prev) => [...prev, { id: medicine.id, name: medicine.name }]);
      toast.success(`${medicine.name} added to list.`);
    }
    setSearchQuery("");
    setFilteredMedications([]);
  };

  const handleBatchAddMedicines = async () => {
    const medicineIds = medicationList.map((med) => med.id);

    if (!medicineIds.length) {
      toast.error("No medicines selected to add.");
      return;
    }

    try {
      await api.addMedicinesToRecord(formData.medical_record_id, medicineIds);
      toast.success("Medicines added to medical record successfully.");
    } catch (error) {
      console.error("Error adding medicines to record:", error.message);
      toast.error("Failed to add medicines to medical record.");
    }
  };

  const handleRemoveMedicine = async (medicineId) => {
    try {
      setMedicationList((prev) => prev.filter((med) => med.id !== medicineId));
      await api.removeMedicineFromRecord(formData.medical_record_id, medicineId);
      toast.success("Medicine removed from medical record.");
    } catch (error) {
      console.error("Error removing medicine from record:", error);
      toast.error("Failed to remove medicine from medical record.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!medicationList.length) {
      toast.error("No medicines selected to save.");
      return;
    }

    try {
      const medicineIds = medicationList.map((medicine) => medicine.id); //conver sang wrray
      const recordRequest = {
        treatment: formData.treatment,
        diagnosis: formData.diagnosis,
        suggest: formData.suggest,
        medicines: medicationList.map((med) => med.id), // Array of IDs
      };
      console.log(medicineIds);

      console.log("Submitting medical record:", recordRequest);

      await api.createMedicalRecord(formData.medical_record_id, recordRequest);

      toast.success("Medical record updated successfully.");
    } catch (error) {
      console.error("Error submitting medical record:", error);
      toast.error("Failed to save medical record.");
    }
  };


  return (
      <div className="flex min-h-screen">
        <div className="w-1/5 bg-white shadow-lg">
          <Sidebar/>
        </div>

        <div className="flex-grow p-8 space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 shadow-lg rounded-lg p-6">
              <h1 className="text-3xl font-bold text-white mb-6">Medical Record</h1>
              <div className="flex space-x-4 items-end">
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

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 space-y-4">
                <div>
                  <label className="text-blue-700 font-medium text-xl">Diagnosis</label>
                  <textarea
                      name="diagnosis"
                      value={formData.diagnosis || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter illness details"
                      rows="4"
                  />
                </div>

                <div>
                  <label className="text-blue-700 font-medium text-xl">Treatment</label>
                  <textarea
                      name="treatment"
                      value={formData.treatment || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter treatment details"
                      rows="4"
                  />
                </div>

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
                          {filteredMedications.map((medicine) => (
                              <li
                                  key={medicine.id}
                                  className="p-2 hover:bg-blue-100 cursor-pointer"
                                  onClick={() => handleSelectMedication(medicine)}
                              >
                                {medicine.name}
                              </li>
                          ))}
                        </ul>
                    )}
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {medicationList.map((medicine) => (
                      <li
                          key={medicine.id}
                          className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow"
                      >
                        <div>
                          <strong>{medicine.name}</strong>
                        </div>
                        <FiTrash
                            className="text-red-500 text-xl cursor-pointer hover:text-red-700"
                            onClick={() => handleRemoveMedicine(medicine.id)}
                        />
                      </li>
                  ))}
                </ul>

                {/* Display persisted name_medicine on the medical record */}
                <div className="mt-4">
                  <label className="text-blue-700 font-medium text-xl">Persisted Medicines</label>
                  <ul className="mt-2 space-y-2">
                    {formData.medicines && formData.medicines.length > 0 ? (
                        formData.medicines.map((medicine, index) => (
                            <li
                                key={index}
                                className="bg-gray-100 p-3 rounded-md shadow"
                            >
                              <strong>{medicine}</strong>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No persisted medicines.</p>
                    )}
                  </ul>
                </div>


                <div className="mt-4">
                  <label className="text-blue-700 font-medium text-xl">Suggestions</label>
                  <textarea
                      name="suggest"
                      value={formData.suggest || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                      placeholder="Add any suggestions here..."
                      rows="4"
                  />
                </div>

              </div>

              <div className="col-span-1 bg-white shadow-lg rounded-lg p-6 space-y-4">
                <div className="flex flex-col space-y-4">
                  <button
                      className="bg-blue-100 text-blue-700 font-medium text-xl rounded-lg p-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-200"
                      onClick={() => toggleSection("patientInfo")}
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

        <ToastContainer/>
      </div>
  );
};

export default MedicalRecord;