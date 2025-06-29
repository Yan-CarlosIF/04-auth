import { withSRRAuth } from "../utils/withSRRAuth";
import { setupAPIClient } from "../services/axios";

export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>
    </>
  );
}

export const getServerSideProps = withSRRAuth(async (context) => {
  const apiClient = setupAPIClient(context);
  await apiClient.get("/me");

  return {
    props: {},
  };
});
