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
      console.error(
        "Error fetching patient information:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
  async searchPatient(studentId) {
    try {
      const response = await this.axiosObject.get(`/patient`, {
        params: { studentId },
      });
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
          doctorID: doctorId,
          patientID: patientId,
          time,
        }
      );
      return response.data.message || "Appointment created successfully";
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
      console.error(
        "Error fetching appointments by date:",
        error.response?.data || error.message
      );
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
        id,
      });
      return response.data.message || "Appointment time updated successfully";
    } catch (error) {
      console.error(
        "Error editing appointment time:",
        error.response?.data || error.message
      );
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
      const response = await this.axiosObject.patch(
        `/appointment/updateStatus/${id}`,
        {
          doctorID: doctorId,
          patientID: patientId,
          time,
          status,
          id,
        }
      );
      return response.data.message || "Appointment status updated successfully";
    } catch (error) {
      console.error(
        "Error updating appointment status:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
  }




}
