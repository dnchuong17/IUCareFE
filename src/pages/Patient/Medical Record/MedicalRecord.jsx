import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../components/Sidebar.jsx";
import { FiSearch, FiTrash } from "react-icons/fi";
import { Api } from "../../../utils/api.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicalRecord = () => {

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [medicationList, setMedicationList] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latestRecord, setLatestRecord] = useState(null);
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
    patient_name: "",
    student_id:"",
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
      try {
        const appointment = location.state?.appointment
        console.log(appointment);

        if (!appointment) {
          console.error("No appointment found in location.state.");
          toast.error("No appointment data available.");
          return;
        }

        let doctorDetails = {};
        let patientDetails = {};
        let record = {};

        try {
          doctorDetails = await api.getDoctorById(appointment.doctorId);
        } catch (error) {
          console.error("Error fetching doctor details:", error.message);
          toast.error("Failed to fetch doctor details.");
        }

        try {
          patientDetails = await api.getPatientInformation(appointment.student_id);
          console.log(patientDetails);
        } catch (error) {
          console.error("Error fetching patient details:", error.message);
          toast.error("Failed to fetch patient details.");
        }

        try {
          record = await api.getDetailByRecordId(appointment.appointment_id);
        } catch (error) {
          console.error("Error fetching record details:", error.message);
          toast.error("Failed to fetch record details.");
        }

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
        console.error("Unexpected error loading appointment details:", error);
        toast.error("Unexpected error occurred.");
      }
    };


    // Call the loadAppointmentDetails function only if appointment data is present in location.state
    if (location.state?.appointment) {
      loadAppointmentDetails();
    }



    const fetchMedicalRecord = async () => {
      if (!formData.appointment_id) return;

      // setLoading(true);
      try {
        const record = await api.getRecordByAppointmentId(Number(formData.appointment_id));
        console.log("Fetched Medical Record:", record);
        // setMedicalRecord(record);
      } catch (error) {
        console.error("Error fetching medical record:", error.message);
        toast.error("Failed to fetch medical record.");
      } finally {
        // setLoading(false);
      }
    };

    // Call the main logic
    const initializeData = async () => {
      if (location.state?.appointment) {
        await loadAppointmentDetails();
      }

      if (formData.appointment_id) {
        await fetchMedicalRecord();
      }
    };

    initializeData();
  }, [location.state, formData.appointment_id]);






  const toggleSection = async (section) => {
    setActiveSections((prev) =>
        prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );

    if (section === "latestRecord" && !latestRecord) {
      try {
        const previousRecord = await api.getPreviousPatientRecord(
            formData.patientId,
            formData.date
        );

        if (previousRecord) {
          setLatestRecord(previousRecord);
        } else {
          console.warn("No previous records found.");
        }
      } catch (error) {
        console.error("Error fetching latest record:", error);
        toast.error("Failed to fetch the latest record.");
      }
    }
  };




  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      setIsLoading(true);
      try {
        const medicines = await api.searchMedicine(query);
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

  const handleRemoveMedicine = (medicineId) => {
    setMedicationList((prev) => prev.filter((med) => med.id !== medicineId));
    toast.success("Medicine removed from the list.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!medicationList.length) {
      toast.error("No medicines selected to save.");
      return;
    }

    try {
      // Fetch medical_record_id using appointment_id
      const record = await api.getRecordByAppointmentId(formData.appointment_id);
      const medicalRecordId = record?.medical_record_id;

      if (!medicalRecordId) {
        toast.error("Medical record ID not found.");
        return;
      }

      // Prepare the request payload
      const recordRequest = {
        treatment: formData.treatment,
        diagnosis: formData.diagnosis,
        suggest: formData.suggest,
        medicines: medicationList.map((med) => med.id),
      };

      // Submit the medical record update
      await api.createMedicalRecord(medicalRecordId, recordRequest);

      // Update appointment status to DONE
      await api.updateStatusAppointment(
          formData.appointment_id,
          "DONE",
          formData.doctorId,
          formData.patientId,
          formData.appointment_time
      );

      toast.success("Medical record updated successfully.");
    } catch (error) {
      console.error("Error submitting medical record:", error);
      toast.error("Failed to save medical record.");
    }
  };



  return (
      <div className="flex min-h-screen ">
        <div className="w-1/5 bg-white shadow-lg">
          <Sidebar/>
        </div>

        <div className="flex-grow p-8 space-y-6">
          <div >
            <div className="bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 shadow-lg rounded-lg p-6">
              <h1 className="text-3xl font-bold text-white mb-6">Medical Record</h1>

              <div className="flex space-x-4 items-center">
                {/* Patient Name Input */}
                <div className="flex flex-col w-2/5">
                  <label className="text-blue-950 font-medium text-xl">Patient Name</label>
                  <input
                      type="text"
                      name="patient_name"
                      value={formData.patient_name}
                      readOnly
                      className="border border-gray-400 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-200"
                      placeholder="Patient name will appear here"
                  />
                </div>

                {/* Doctor Name Input */}
                <div className="flex flex-col w-2/5">
                  <label className="text-blue-900 font-medium text-xl">Doctor Name</label>
                  <input
                      type="text"
                      name="doctor_name"
                      value={formData.doctor_name}
                      readOnly
                      className="border border-blue-400 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-200"
                      placeholder="Doctor name will appear here"
                  />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold mt-8"
                >
                  Submit
                </button>
              </div>


            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
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
                        {latestRecord ? (
                            <>
                              <p className="text-gray-700">
                                <strong>Medical Record ID:</strong> {latestRecord.medical_record_id || "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <strong>Date:</strong> {new Date(latestRecord.appointment_time).toLocaleString() || "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <strong>Diagnosis:</strong> {latestRecord.diagnosis || "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <strong>Treatment:</strong> {latestRecord.treatment || "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <strong>Suggestions:</strong> {latestRecord.suggest || "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <strong>Medicines:</strong>{" "}
                                {latestRecord.name_medicine && latestRecord.name_medicine.length > 0
                                    ? latestRecord.name_medicine.join(", ")
                                    : "No medicines prescribed."}
                              </p>
                              {/*<p className="text-gray-700">*/}
                              {/*  <strong>Patient Name:</strong> {latestRecord.patient_name || "N/A"}*/}
                              {/*</p>*/}
                              {/*<p className="text-gray-700">*/}
                              {/*  <strong>Student ID:</strong> {latestRecord.student_id || "N/A"}*/}
                              {/*</p>*/}
                              {/*<p className="text-gray-700">*/}
                              {/*  <strong>Patient Address:</strong> {latestRecord.patient_address || "N/A"}*/}
                              {/*</p>*/}
                              {/*<p className="text-gray-700">*/}
                              {/*  <strong>Patient Phone:</strong> {latestRecord.patient_phone || "N/A"}*/}
                              {/*</p>*/}
                              {/*<p className="text-gray-700">*/}
                              {/*  <strong>Allergy:</strong> {latestRecord.allergy || "N/A"}*/}
                              {/*</p>*/}
                            </>
                        ) : (
                            <p className="text-gray-500">No previous records found.</p>
                        )}
                      </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>

        <ToastContainer/>
      </div>
  );
};
export default MedicalRecord;