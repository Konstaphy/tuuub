import { useState } from "react";
import { authTransport } from "../../../features/auth/api/auth-transport";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../entities/user/model/user";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const setUser = useUserStore((st) => st.setUser);

  const signIn = () => {
    setError(null);
    authTransport
      .signIn(username, SHA256(password).toString())
      .then((res) => {
        setUser(res.user_id, res.token);
        navigate("/person/" + res.user_id);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          setError("Неверный логин или пароль");
        }
      });
  };

  return (
    <div>
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
      {error && <p>{error}</p>}
      <button onClick={signIn}>123</button>
    </div>
  );
};
