import { useState } from "react";
import { authTransport } from "../../../features/auth/api/auth-transport";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signUp = () => {
    const pw = SHA256(password).toString();
    authTransport
      .signUp(username, pw, email)
      .then((res) => {
        localStorage.setItem("token", res.token);
        navigate("/");
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <div>
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
      {error && <p>{error}</p>}
      <button onClick={signUp}>123</button>
    </div>
  );
};
