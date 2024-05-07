"use client";

import Image from "next/image";
import Placer from "../construccion_logic/components/objectPlacer";
import { useState, useEffect } from "react";

import { glod_mine_Array } from "../construccion_logic/utils/StructuresData";

export default function Home() {
  const [placerApear, setPlacerApear] = useState(false);
  const [structure, setStructure] = useState<null | number>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // console.log(glod_mine_Array);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    // Agrega el event listener cuando el componente se monta
    document.addEventListener("mousemove", handleMouseMove);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center relative">
      <button
        className="absolute bg-blue-500 text-white px-4 py-2 rounded-md"
        style={{ left: "10px", zIndex: 2 }} // Ajusta el valor de 'left' según tus necesidades
        onClick={() => {
          setPlacerApear(!placerApear);
        }}
      >
        Toggle Cursor Marker
      </button>
      <Placer appearence={placerApear} structure={structure} />
      <Image
        src="/Map_Classic_Scenery.jpg"
        alt="clash_map"
        width={2000}
        height={500}
        onClick={() => {
          if (placerApear) {
            checkTerrain(cursorPosition) ? addstructure(cursorPosition) : null;
          }
          // console.log("click en el mapa");
          placerApear ? setPlacerApear(false) : null; //this if is to hide the cursor marker when the map is clicked, if the conditional doesn`t exist it will always reload the component because of how useState works.
        }}
        className="inset-0 w-full h-full object-cover"
      />
    </main>
  );
}

function checkTerrain(position: { x: number; y: number }): boolean {
  return true;
}

function addstructure(position: { x: number; y: number }): void {
  glod_mine_Array.push({
    id: glod_mine_Array.length,
    position: { x: position.x, y: position.y },
  });
}
