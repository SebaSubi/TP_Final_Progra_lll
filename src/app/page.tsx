"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const images = [
  "/Level1_Elixir.png",
  "/Level2_Elixir.png",
  "/Level3_Elixir.png",
  "/Level4_Elixir.png"
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const intervalId = setInterval(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000)
      
      return () => clearInterval(intervalId);
  }, [])
  /**/
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>

        <div className="flex items-center justify-center">
          <Image src={images[currentIndex]} alt={`Level ${currentIndex + 1} Elixir`} width={100} height={100} />
        </div>

      </div>

    </main>
      
  );
}