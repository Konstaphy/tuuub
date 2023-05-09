import { AxiosResponse } from "axios";
import { transport } from "../../../shared/api/transport";

const methods = {
  signUp: "sign-up",
  signIn: "sign-in",
  refresh: "refresh",
};

export interface IAuthTransport {
  signUp(
    username: string,
    password: string,
    email: string
  ): Promise<{ token: string; user_id: string; username: string }>;
  signIn(
    username: string,
    password: string
  ): Promise<{ token: string; user_id: string; username: string }>;
  refresh(
    token: string
  ): Promise<{ token: string; user_id: string; username: string }>;
}

class AuthTransport implements IAuthTransport {
  private readonly url = "/users/";

  public async signUp(username: string, password: string, email: string) {
    return await transport
      .post<
        FormData,
        AxiosResponse<{ token: string; user_id: string; username: string }>
      >(this.url + methods.signUp, {
        username,
        password,
        email,
        age: 18,
      })
      .then((res) => res.data);
  }
  public async signIn(username: string, password: string) {
    return await transport
      .post<
        FormData,
        AxiosResponse<{ token: string; user_id: string; username: string }>
      >(this.url + methods.signIn, {
        username,
        password,
      })
      .then((res) => res.data);
  }

  public async refresh(token: string) {
    return await transport
      .get(this.url + methods.refresh, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  }
}

export const authTransport = new AuthTransport();
