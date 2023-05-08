import { useState } from "react";
import { authTransport } from "../../../features/auth/api/auth-transport";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../../features/auth/lib/authentication-service";
import classes from "../authentication.module.css";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const authService = new AuthenticationService(authTransport);

  const signIn = () => {
    setError(null);
    authService
      .signIn(username, SHA256(password).toString())
      .then((res) => {
        navigate("/person/" + res.user_id);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          setError("Неверный логин или пароль");
        }
        setError(e.response.data);
      });
  };

  return (
    <div className={classes.authentication}>
      <div className={classes.authentication__content}>
        <div className={classes.authentication__form}>
          <h3>Войти</h3>
          <input
            placeholder={"Имя пользователя"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder={"Пароль"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={"alert"}>{error}</p>}
          <button onClick={signIn}>Войти</button>
          <p className={"secondary"} onClick={() => navigate("/sign-up")}>
            Зарегистрироваться
          </p>
        </div>
      </div>
    </div>
  );
};
