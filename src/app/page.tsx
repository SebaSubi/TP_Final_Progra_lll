import Image from "next/image";
import Providers from "./Providers";

export default function Home() {
  return (
    <Providers>
      <main className="flex min-h-screen flex-col items-center justify-between p-24" 
            style={{ backgroundImage: `url(/background.png)`, backgroundSize: 'cover' }}>
        {/* El contenido de tu página va aquí */}
      </main>
    </Providers>
  );
}