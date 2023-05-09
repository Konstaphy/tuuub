import { useState } from "react";
import { authTransport } from "../../../features/auth/api/auth-transport";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../../features/auth/lib/authentication-service";
import classes from "../authentication.module.css";
import { Button } from "../../../shared/ui/button/button";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const authService = new AuthenticationService(authTransport);

  const signUp = () => {
    authService
      .signUp(username, SHA256(password).toString(), email)
      .then((res) => {
        navigate("/person/" + res.user_id);
      })
      .catch((e) => {
        setError(e.response.data);
      });
  };

  return (
    <div className={classes.authentication}>
      <div className={classes.authentication__content}>
        <div className={classes.authentication__form}>
          <h3>Регистрация</h3>
          <input
            value={username}
            placeholder={"Имя пользователя"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={email}
            placeholder={"Электронная почта"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            placeholder={"Пароль"}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={"alert"}>{error}</p>}
          <Button onClick={signUp}>Зарегистрироваться</Button>
          <p
            className={"secondary clickable"}
            onClick={() => navigate("/sign-in")}
          >
            Уже есть аккаунт
          </p>
        </div>
      </div>
    </div>
  );
};
