import axios, { AxiosResponse } from "axios";
import { useUserStore } from "../../../entities/user/model/user";

const methods = {
  signUp: "sign-up",
  signIn: "sign-in",
};

export interface IAuthTransport {
  signUp(
    username: string,
    password: string,
    email: string
  ): Promise<{ token: string; user_id: string }>;
  signIn(
    username: string,
    password: string
  ): Promise<{ token: string; user_id: string }>;
}

class AuthTransport {
  private readonly url = "http://localhost:8080/users/";

  public async signUp(username: string, password: string, email: string) {
    return await axios
      .post<FormData, AxiosResponse<{ token: string; user_id: string }>>(
        this.url + methods.signUp,
        {
          username,
          password,
          email,
          age: 18,
        }
      )
      .then((res) => res.data);
  }
  public async signIn(username: string, password: string) {
    return await axios
      .post<FormData, AxiosResponse<{ token: string; user_id: string }>>(
        this.url + methods.signIn,
        {
          username,
          password,
        }
      )
      .then((res) => res.data);
  }
}

export const authTransport = new AuthTransport();
