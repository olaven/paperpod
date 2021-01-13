import { NO_CONTENT } from "node-kall";
import { useContext } from "react";
import { logout } from "./authFetchers";
import { UserContext } from "./UserContext";

export const Logout = () => {
  const { token, setToken } = useContext(UserContext);

  const onLogout = async () => {
    const [status] = await logout(token);

    if (status === NO_CONTENT) {
      setToken(null);
    } else {
      alert("An error occured when logging out");
    }
  };

  return <button onClick={onLogout}>Logg ut</button>;
};
