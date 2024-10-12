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
  async login(loginRequest: LoginRequest) {
    //login nhan 1 doi tuong la LoginRequest
    const { account, password } = loginRequest; //account contains the value of attribute account, password the same
    console.log(account, password);
    const result1 = await this.axiosObject.post("/auth/doctorLogin", {
      account: account,
      password: password,
    });
    localStorage.setItem("accessToken", result1.data.access_token);
    localStorage.setItem("refreshToken", result1.data.refresh_token);
    return result1.data;
  }

  async register(registerRequest: RegisterRequest) {
    try {
      const { doctorName, address, phone, account, password, department_id } =
        registerRequest; //account contains the value of attribute account, password the same
      console.log(doctorName, address, phone, account, password, department_id);
      const result2 = await this.axiosObject.post("/auth/doctorRegister", {
        doctorName: doctorName,
        address: address,
        phone: phone,
        account: account,
        password: password,
        department_id: department_id,
      });
      console.log(result2.data);
      return result2.data;
    } catch (error) {
      console.log(error);
    }
    //register nhan 1 doi tuong la LoginRequest
  }
}
