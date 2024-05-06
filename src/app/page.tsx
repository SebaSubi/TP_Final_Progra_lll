import Image from "next/image";
import Placer from "./components/placer";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center relative">
      <Placer />
    </main>
  );
}
