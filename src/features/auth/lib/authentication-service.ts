import { IAuthTransport } from "../api/auth-transport";
import { useUserStore } from "../../../entities/user/model/user";

export class AuthenticationService {
  constructor(private readonly transport: IAuthTransport) {}

  public async signUp(username: string, password: string, email: string) {
    const { setUser } = useUserStore.getState();
    const { token, user_id } = await this.transport.signUp(
      username,
      password,
      email
    );

    setUser(user_id, token);

    return { token, user_id };
  }

  public async signIn(username: string, password: string) {
    const { setUser } = useUserStore.getState();
    const { token, user_id } = await this.transport.signIn(username, password);

    setUser(user_id, token);

    return { token, user_id };
  }
}
