import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import {useUserStore} from "../../app";

export const SignIn = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const { setToken } = useUserStore()

    useEffect(() => {
        if (!window.location.href.includes("code")) {
            window.location.href =
                "https://oauth.yandex.ru/authorize?response_type=code\n" +
                `&client_id=ce07ed166f7440a4b0f304af6842ca0b&redirect_uri=http://localhost:5173/sign-in`
        } else {
            axios
                .get<{ access_token: string | null }>(
                    `http://localhost:8080/users/token/` + params.get("code"),
                )
                .then((data) => {
                    if (!data.data.access_token) {
                        throw Error("Не пришел токен")
                    }
                    setToken(data.data.access_token || null)
                    navigate("/")
                })
                .catch(console.error)
        }
    }, [navigate, params])

    return <div>Логин....</div>
}