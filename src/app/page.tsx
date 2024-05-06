import Image from "next/image";
import Placer from "./components/placer";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center relative">
      <Placer />
      <Image
        src="/Map_Classic_Scenery.jpg"
        alt="clash_map"
        width={2000}
        height={500}
        className="inset-0 w-full h-full object-cover"
      />
    </main>
  );
}
