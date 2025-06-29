import { FormEvent, useContext, useState } from "react";
import { authContext } from "../context/AuthContext";
import { withSRRGuest } from "../utils/withSSRGuest";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(authContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await signIn({
      email,
      password,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}

export const getServerSideProps = withSRRGuest(async (context) => {
  return {
    props: {},
  };
});
