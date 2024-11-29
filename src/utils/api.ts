import axios, { AxiosInstance } from "axios";
import { LoginRequest } from "./request/loginRequest";
import { RegisterRequest } from "./request/registerRequest";

export class Api {
  private axiosObject: AxiosInstance;
  constructor() {
    this.axiosObject = axios.create({
      baseURL: "http://localhost:2024",
      withCredentials: true, //Cho phép gửi cookie và thông tin xác thực khác trong các yêu cầu
    });
  }
  getAxiosObject() {
    return this.axiosObject;
  }
  // async login(loginRequest: LoginRequest) {
  //   //login nhan 1 doi tuong la LoginRequest
  //   const { account, password } = loginRequest; //account contains the value of attribute account, password the same
  //   console.log(account, password);
  //   const result1 = await this.axiosObject.post("/auth/doctorLogin", {
  //     account: account,
  //     password: password,
  //   });
  //   localStorage.setItem("accessToken", result1.data.access_token);
  //   localStorage.setItem("refreshToken", result1.data.refresh_token);
  //   return result1.data;
  // }

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


}
