// src/components/Profile.jsx
import { useState, useEffect } from "react";
import { Api } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar.jsx";
import { HiOutlinePencilAlt } from "react-icons/hi";

const Profile = () => {
  const [info, setInfo] = useState({
    doctor_id: "",
    doctor_name: "",
    password: "********",
    doctor_address: "",
    doctor_phone: "",
    department_name: "",
    department_number: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const api = new Api();

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

        const detailedInfo = await api.getDoctorById(doctorId);
        const infoWithId = { ...detailedInfo, doctor_id: doctorId };
        setInfo(infoWithId);
        localStorage.setItem("doctorInfo", JSON.stringify(infoWithId));
      } catch (error) {
        console.error("Error fetching doctor information:", error.response?.data || error.message);
        toast.error("Failed to fetch doctor information.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchDoctorInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updatedData = {
      password: info.password !== "********" ? info.password : undefined,
      doctor_address: info.doctor_address,
      doctor_phone: info.doctor_phone,
    };

    const filteredData = Object.entries(updatedData).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    if (Object.keys(filteredData).length === 0) {
      toast.info("No changes to save!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      console.log("Payload being sent:", filteredData);
      await api.updateDoctorInfo(info.doctor_id, filteredData);

      setInfo((prevState) => ({
        ...prevState,
        ...filteredData,
        password: "********",
      }));

      localStorage.setItem(
        "doctorInfo",
        JSON.stringify({ ...info, ...filteredData })
      );

      toast.success("Information updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(
        "Error updating information:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to update information. Error: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }

    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 bg-white shadow-lg">
          <Sidebar />
        </div>

        {/* Profile Content */}
        <div className="w-full md:w-4/5 p-4 md:p-6 flex items-center justify-center">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10 border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-4xl font-bold text-blue-600">
                Doctor Profile
              </h1>
              <HiOutlinePencilAlt
                  className="text-3xl text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={handleEditToggle}
              />
            </div>

            <form className="space-y-6">
              {/* Full Name & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Full Name"
                    name="doctor_name"
                    value={info.doctor_name}
                    disabled
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={info.password}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
              </div>

              {/* Address & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Address"
                    name="doctor_address"
                    value={info.doctor_address}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
                <InputField
                    label="Phone"
                    name="doctor_phone"
                    value={info.doctor_phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
              </div>

              {/* Department Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Department Name"
                    name="department_name"
                    value={info.department_name}
                    disabled
                />
                <InputField
                    label="Department Number"
                    name="department_number"
                    value={info.department_number}
                    disabled
                />
              </div>

              {isEditing && (
                  <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
              )}
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
  );
};

// Reusable Input Field Component
const InputField = ({
                      label,
                      name,
                      value,
                      type = "text",
                      onChange,
                      disabled = false,
                    }) => (
    <div className="space-y-2">
      <label className="block text-md font-medium text-blue-600">{label}</label>
      <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full h-12 border text-gray-700 border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-md pl-3 ${
              disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
      />
    </div>
);

export default Profile;