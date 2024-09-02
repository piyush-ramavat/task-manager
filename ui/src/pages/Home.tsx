import React from "react";
import { useCookies } from "react-cookie";

function Home() {
  const [cookies] = useCookies(["user"]);

  return (
    <>
      <h1>Welcome {cookies.user?.name}</h1>
    </>
  );
}

export default Home;
