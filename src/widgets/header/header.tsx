import "./header.css";
import { useUserStore } from "../../entities/user/model/user";
export const Header = () => {
  const username = useUserStore((st) => st.username);
  return (
    <div className={"header"}>
      <p>TuUuB</p>
      <p className={"tip"}>Press H to open menu</p>
      <p className={"avatar"}>{username}</p>
    </div>
  );
};
