import { useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext";
import { api } from "../services/axios";

export default function Dashboard() {
  const { user } = useContext(authContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>
    </div>
  );
}
