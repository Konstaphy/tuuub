import "./header.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../app";
export const Header = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  return (
    <div className={"header"}>
      <p onClick={() => navigate("/")}>TuUuB</p>
      <p className={"tip"}>Press H to open menu</p>
      <div>
        <p className={"avatar"} onClick={() => navigate(`/person/${user?.id}`)}>
          {user?.real_name}
        </p>
        <p style={{ fontSize: "12px" }}>{user?.display_name}</p>
      </div>
    </div>
  );
};
