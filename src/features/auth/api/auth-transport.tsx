import axios, { AxiosResponse } from "axios";

const methods = {
  signUp: "sign-up",
  signIn: "sign-in",
};

class AuthTransport {
  private readonly url = "http://95.182.122.177:8080/users/";

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
