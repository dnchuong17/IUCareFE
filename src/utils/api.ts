import axios, { AxiosInstance } from "axios";
import { LoginRequest } from "./request/loginRequest";
import { RegisterRequest } from "./request/registerRequest";
import { DoctorInforModel } from "../model/doctorInfor.model";
import {AppointmentRequest} from "./request/appointmentRequest";
import {MedicalRequest} from "./request/medicalRequest";
import {RecordRequest} from "./request/recordRequest";
import {DetailedMedicalRequest} from "./request/detailedMedicalRequest";

export class Api {
  private axiosObject: AxiosInstance;

  constructor() {
    this.axiosObject = axios.create({
      baseURL: "http://localhost:2024",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }

  getAxiosObject() {
    return this.axiosObject;
  }

  // Authentication Methods
  async login(loginRequest: LoginRequest) {
    const {account, password} = loginRequest;
    try {
      const result = await this.axiosObject.post("/auth/doctorLogin", { account, password });
      localStorage.setItem("accessToken", result.data.access_token);
      localStorage.setItem("refreshToken", result.data.refresh_token);
      return result.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async register(registerRequest: RegisterRequest) {
    try {
      const result = await this.axiosObject.post("/auth/doctorRegister", registerRequest);
      console.log("Server response:", result.data);
      return result.data;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async searchMedicine(medicine_name: string): Promise<{ id: number; name: string }[]> {
    try {
      const response = await this.axiosObject.get("/medicine", {
        params: { medicine_name },
      });
      console.log("API Response:", response.data); // Log response
      return response.data.map((item) => ({
        id: item.id, // Ensure correct property names
        name: item.name,
      }));
    } catch (error) {
      console.error("Error fetching medicines:", error.response?.data || error.message);
      throw error;
    }
  }


  async getDoctorByAccount(account: string) {
    try {
      const response = await this.axiosObject.get(`/doctor/account/${account}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching doctor by account:", error.response?.data || error.message);
      throw error;
    }
  }

  async getDoctorById(doctor_id: number) {
    try {
      const response = await this.axiosObject.get(`/doctor/${doctor_id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching doctor by ID:", error.response?.data || error.message);
      throw error;
    }
  }

  async updateDoctorInfo(doctorId: number, doctorInfor: DoctorInforModel) {
    try {
      const response = await this.axiosObject.patch(`/doctor/change_information/${doctorId}`, doctorInfor);
      return response.data;
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async createPatient(informationRequest) {
    try {
      const response = await this.axiosObject.post("/patient/create", informationRequest);
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Create information failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async searchPatient(studentId: string) {
    try {
      console.log(`Frontend input: ${studentId}`);
      const response = await this.axiosObject.get("/patient", {
        params: {studentId},
      });
      console.log(`API response: ${JSON.stringify(response.data)}`);
      return response.data; // Return response data from API
    } catch (error) {
      console.error("Error searching for patient:", error.response?.data || error.message);
      throw error; // Throw error to handle it in the component
    }
  }

  // Method to get patient information by studentId
  async getPatientInformation(studentId: string) {
    try {
      const response = await this.axiosObject.get(`/patient/information`, {
        params: {studentId},
      });
      return response.data; // Return patient information
    } catch (error) {
      console.error("Error fetching patient information:", error.response?.data || error.message);
      throw error; // Throw error to handle it in the component
    }
  }

  async createAppointment(appointmentRequest: AppointmentRequest): Promise<any> {
    try {
      const response = await this.axiosObject.post(
          "/appointment/create_appointment",
          appointmentRequest
      );
      console.log("Create appointment successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating appointment:", error.response?.data || error.message);
      throw error;
    }
  }

  async updateAppointmentTime(appointment_id: number, appointmentRequest: AppointmentRequest): Promise<any> {
    try {
      const response = await this.axiosObject.patch(`/appointment/edit/${appointment_id}`, appointmentRequest);
      return response.data;
    } catch (error) {
      console.error("Error updating appointment:", error.response?.data || error.message);
      throw error;
    }
  }


  async getAppointment(date: Date) {
    try {
      const response = await this.axiosObject.get(`/appointment/check`, {
        params: { date },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment:", error.response?.data || error.message);
      throw error;
    }
  }


  async getInsurance (studentId: string) {
    try {
      const response = await this.axiosObject.get("insurance/:studentId", {
        params: {studentId},
      })
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log("Error fetching insurance: ", error.response?.data || error.message);
      throw error;
    }
  }


  async updateStatusAppointment(appointment_id: number, newStatus: string): Promise<any> {
    try {
      // Kiểm tra trạng thái có hợp lệ không
      const validStatuses = ["APPROVED", "DONE", "CANCELLED"];
      if (!validStatuses.includes(newStatus)) {
        throw new Error("Invalid status. Allowed values are: APPROVED, DONE, CANCELLED");
      }

      const response = await this.axiosObject.patch(`/appointment/updateStatus/${appointment_id}`, {
        status: newStatus,
      });

      console.log("Status updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
      throw error;
    }
  }


  async getRecordByAppointmentId(appointment_id: number) {
    try {
      const response = await this.axiosObject.get(`/medical_record/get/${appointment_id}`);
      console.log("Fetched Updated Record:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching updated medical record:", error.response?.data || error.message);
      throw error;
    }
  }



  async createMedicalRecord(recordId: number, recordRequest: RecordRequest) {
    console.log("Creating Medical Record with ID:", recordId);
    console.log("Payload:", recordRequest);

    try {
      const response = await this.axiosObject.patch(
          `/medical_record/create/${recordId}`,
          recordRequest // Ensure this payload matches backend expectations
      );
      console.log("Medical record updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
          "Error creating medical record:",
          error.response?.data || error.message
      );
      throw error;
    }
  }



  async addMedicinesToRecord(medical_record_id: number, medicine_ids: number[]) {
    // Validate medicine_ids is not empty
    if (!medicine_ids || medicine_ids.length === 0) {
      throw new Error("No medicines to add.");
    }

    try {
      const response = await axios.post("/medicine/add", {
        medical_record_id,
        medicine_ids,
      });
      console.log("Medicines added to record successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding medicines to record:", {
        medical_record_id,
        medicine_ids,
        error: error.response?.data || error.message,
      });
      throw error;
    }
  }


  async getRecordByPatientId(patientId: number) {
    try {
      const response = await this.axiosObject.get(`/medical_record/records/${patientId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching patient records:", error.message);
      throw error;
    }
  }

  async getPatientRecordDetail(medical_record_id: number) {
    try {
      const response = await  this.axiosObject.get(`/medical_record/get/detail/${medical_record_id}`);
      console.log("Detail response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting record detail:", error.response?.data || error.message);
      throw error;
    }
  }

  async getPreviousPatientRecord(patientId: number, date: Date) {
    try {
      const response = await this.axiosObject.get(`/medical_record/previous_record/${patientId}`, {
        params: { date },
      });
      console.log("Previous record response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting previous patient record:", error.response?.data || error.message);
      throw error;
    }
  }



}