import {useRef, useState} from "react";
import { authTransport } from "../../../features/auth/api/auth-transport";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../../features/auth/lib/authentication-service";
import classes from "../authentication.module.css";
import yandexid from "./../../../shared/assets/yandexid.webp"

export const YandexSignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const changePassword = useRef("password");

    const navigate = useNavigate();
    const authService = new AuthenticationService(authTransport);

    const SignIn = () => {
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
                    <h3>Вход</h3>
                    <button className="button">Войти через    <img className="yandexidpic" src={yandexid} alt=""/></button>
                </div>
            </div>
        </div>
    );
};
