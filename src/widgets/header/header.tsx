import "./header.css";
import { useNavigate } from "react-router-dom";
import {useUserStore} from "../../app";
export const Header = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  return (
    <div className={"header"}>
      <p>TuUuB</p>
      <p className={"tip"}>Press H to open menu</p>
      <p className={"avatar"} onClick={() => navigate(`/person/${user?.id}`)}>
        {user?.real_name}
      </p>
    </div>
  );
};
