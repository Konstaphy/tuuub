import {useRef, useState} from "react";
import { authTransport } from "../../../features/auth/api/auth-transport";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import classes from "../authentication.module.css";
import yandexid from "./../../../shared/assets/yandexid.webp"

export const YandexSignIn = () => {
    const navigate = useNavigate()
    return (
        <div className={classes.authentication}>
            <div className={classes.authentication__content}>
                <div className={classes.authentication__form}>
                    <h3>Вход</h3>
                    <button onClick={() => navigate("/sign-in")} className="button">Войти через    <img className="yandexidpic" src={yandexid} alt=""/></button>
                </div>
            </div>
        </div>
    );
};
