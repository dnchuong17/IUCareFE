import axios, { AxiosInstance } from "axios";
import { LoginRequest } from "./request/loginRequest";
import { RegisterRequest } from "./request/registerRequest";
import { DoctorInforModel } from "../model/doctorInfor.model";

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

  async login(loginRequest: LoginRequest) {
    const { account, password } = loginRequest;
    try {
      const result = await this.axiosObject.post("/auth/doctorLogin", {
        account,
        password,
      });
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

  async searchMedicine(medicine_name: string): Promise<string[]> {
    try {
      const response = await this.axiosObject.get("/medicine", {
        params: { medicine_name },
      });
      return response.data;
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

  async getDoctorById(doctor_id: string) {
    try {
      const response = await this.axiosObject.get(`/doctor/${doctor_id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching doctor by ID:", error.response?.data || error.message);
      throw error;
    }
  }

  async updateDoctorInfo(doctorId: string, doctorInfor: DoctorInforModel) {
    try {
      const response = await this.axiosObject.patch(`/doctor/change_information/${doctorId}`, doctorInfor);
      return response.data;
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async createPatient(
    name: string,
    address: string,
    major: string,
    phone: string,
    studentId: string,
    allergy: string
  ): Promise<any> {
    try {
      const response = await this.axiosObject.post("/patient/create", {
        name,
        address,
        major,
        phone,
        studentId,
        allergy,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating patient:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getPatientInformation(studentId: string) {
    try {
      const response = await this.axiosObject.get("/patient/information", {
        params: { studentId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching patient information:", error.response?.data || error.message);
      throw error;
    }
  }

 async searchPatient(studentId) {
    try {
      console.log(`Frontend input: ${studentId}`);
      const response = await this.axiosObject.get("/patient", {
        params: { studentId },
      });
      console.log(`API response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error searching patient:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async createAppointment(
    doctorId: string,
    patientId: string,
    time: string
  ): Promise<string> {
    try {
      const response = await this.axiosObject.post(
        "/appointment/create_appointment",
        {
          doctorId,
          patientId,
          time,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error creating appointment:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async checkAppointment(date: string): Promise<Array<any>> {
    try {
      const response = await this.axiosObject.get("/appointment/check", {
        params: { date },
      });
      return response.data.appointments || [];
    } catch (error) {
      console.error("Error fetching appointments by date:", error.response?.data || error.message);
      throw error;
    }
  }

  async editAppointmentTime(
      id: string,
      doctorId: string,
      patientId: string,
      time: string,
      status: string
  ): Promise<string> {
    try {
      const response = await this.axiosObject.patch(`/appointment/edit/${id}`, {
        doctorID: doctorId,
        patientID: patientId,
        time,
        status,
      });
      return response.data.message || "Appointment time updated successfully";
    } catch (error) {
      console.error("Error editing appointment time:", error.response?.data || error.message);
      throw error;
    }
  }

  async updateAppointmentStatus(
      id: string,
      doctorId: string,
      patientId: string,
      time: string,
      status: string
  ): Promise<string> {
    try {
      const response = await this.axiosObject.patch(`/appointment/updateStatus/${id}`, {
        doctorID: doctorId,
        patientID: patientId,
        time,
        status,
      });
      return response.data.message || "Appointment status updated successfully";
    } catch (error) {
      console.error("Error updating appointment status:", error.response?.data || error.message);
      throw error;
    }
  }
}


