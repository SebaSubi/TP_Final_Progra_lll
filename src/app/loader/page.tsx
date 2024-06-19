"use client";

import BarLoader from "react-spinners/BarLoader";
import { useState } from "react";

export default function page() {
  const [loaded, setLoaded] = useState(true);
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <button onClick={() => setLoaded(!loaded)}>change load state</button>
      <BarLoader color={"#fff"} loading={loaded} height={4} width={100} />
    </div>
  );
}
