import axios, { AxiosInstance } from "axios";
import { LoginRequest } from "./request/loginRequest";
import { RegisterRequest } from "./request/registerRequest";
import { DoctorInforModel } from "../model/doctorInfor.model"

export class Api {
  private axiosObject: AxiosInstance;

  constructor() {
    this.axiosObject = axios.create({
      baseURL: "http://localhost:2024",
      withCredentials: true, //Cho phép gửi cookie và thông tin xác thực khác trong các yêu cầu
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
  getAxiosObject() {
    return this.axiosObject;
  }

  async login(loginRequest) {
    const { account, password } = loginRequest;
    try {
      const result1 = await this.axiosObject.post("/auth/doctorLogin", {
        account,
        password,
      });
      localStorage.setItem("accessToken", result1.data.access_token);
      localStorage.setItem("refreshToken", result1.data.refresh_token);
      return result1.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async register(registerRequest) {
    try {
      const result2 = await this.axiosObject.post("/auth/doctorRegister", registerRequest);
      console.log("Server response:", result2.data);
      return result2.data;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw error; // Re-throw error for higher-level handling
    }
  }



  async searchMedicine(medicine_name: string): Promise<string[]> {
    try {
      const response = await this.axiosObject.get("/medicine", {
        params: { medicine_name }, // Gửi tham số query
      });
      return response.data; // Trả về danh sách tên thuốc
    } catch (error) {
      console.error("Error fetching medicines:", error.response?.data || error.message);
      throw error;
    }
  }

  async getDoctorByAccount(account: string) {
    try {
      const response = await this.axiosObject.get(`/doctor/account/${account}`);
      console.log("response", response);
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

  async updateDoctorInfo(doctorId: string, doctorInfor: DoctorInforModel ) {
    try {
      const response = await this.axiosObject.patch(`/doctor/change_information/${doctorId}`, doctorInfor);
     console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      throw error;
    }
  }


  async createPatient (informationRequest) {
    try {
      const response = await this.axiosObject.post("/patient/create", informationRequest);
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Create information failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async getPatient(studentId: string) {
    try {
      const response = await this.axiosObject.get(`/patient/information`, {
        params: { studentId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching patient information:", error.response?.data || error.message);
      throw error;
    }
  }
  }




}
