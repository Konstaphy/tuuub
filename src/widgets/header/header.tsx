import "./header.css";
import { useUserStore } from "../../entities/user/model/user";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const { username, id } = useUserStore((st) => ({
    username: st.username,
    id: st.userId,
  }));
  const navigate = useNavigate();
  return (
    <div className={"header"}>
      <p>TuUuB</p>
      <p className={"tip"}>Press H to open menu</p>
      <p className={"avatar"} onClick={() => navigate(`/person/${id}`)}>
        {username}
      </p>
    </div>
  );
};
