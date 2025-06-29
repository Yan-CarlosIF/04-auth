import { useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext";
import { withSRRAuth } from "../utils/withSRRAuth";
import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/axios";
import { Can } from "../components/Can";

export default function Dashboard() {
  const { user, signOut } = useContext(authContext);

  useEffect(() => {
    api.get("/me").then((response) => console.log(response.data));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSRRAuth(
  async (context) => {
    const apiClient = setupAPIClient(context);
    await apiClient.get("/me");

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);
