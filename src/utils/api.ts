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
    const result1 = await this.axiosObject.post("/auth/patientLogin", {
      account: account,
      password: password,
    });
    console.log(result1.data);
    return result1.data;
  }

  async register(registerRequest: RegisterRequest) {
    //register nhan 1 doi tuong la LoginRequest
    const { account, password, patientName, address, major, phone } =
      registerRequest; //account contains the value of attribute account, password the same
    console.log(account, password, patientName, address, major, phone);
    const result2 = await this.axiosObject.post("/auth/patientRegister", {
      account: account,
      password: password,
      patientName: patientName,
      address: address,
      major: major,
      phone: phone,
    });
    console.log(result2.data);
    return result2.data;
  }
}
