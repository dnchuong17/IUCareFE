import axios, { AxiosInstance } from "axios";
import { LoginRequest } from "./request/loginRequest";
import { RegisterRequest } from "./request/registerRequest";
import { DoctorInforModel } from "../model/doctorInfor.model";
import {AppointmentRequest} from "./request/appointmentRequest";

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
    const {account, password} = loginRequest;
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
        params: {medicine_name},
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

  async getAppointment (date: Date) {
    try {
      const response = await this.axiosObject.get(`/appointment/check`, {
        params: { date },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment:", error.response?.data || error.message);
      throw error;
    }
}

}
