import { useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext";
import { withSRRAuth } from "../utils/withSRRAuth";
import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/axios";

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

export const getServerSideProps = withSRRAuth(async (context) => {
  const apiClient = setupAPIClient(context);
  await apiClient.get("/me");

  return {
    props: {},
  };
});
