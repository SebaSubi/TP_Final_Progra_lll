"use client";

// import Image from "next/image";
import React, { useState, useEffect } from "react";
import { glod_mine_Array, lumber_camp_Array, stone_mine_Array } from "../utils/StructuresData";
import Image from "next/image";

export default function Placer(props: {
  appearence: boolean;
  structure: number | null;
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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
    <div>
      {props.appearence && (
        <div
          className="absolute w-10 h-10 bg-green-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[38deg] -skew-x-[15deg]"
          style={{
            left: Math.floor(cursorPosition.x / 30) * 30,
            top: Math.floor(cursorPosition.y / 30) * 30,
          }}
        ></div>
      )}

      {glod_mine_Array.map((structure, index) => (
        <div
          key={index + "_gold_mine"}
          className="absolute w-10 h-10 bg-yellow-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[37deg] -skew-x-[15deg]"
          //   className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[40deg] -skew-x-[6deg]"
          style={{
            left: Math.floor(structure.position.x / 30) * 30,
            top: Math.floor(structure.position.y / 30) * 30,
          }}
        ></div>
      ))}
      {lumber_camp_Array.map((structure, index) => (
        <div
          key={index + "_wooden_collector"}
          className="absolute justify-center items-center"
          // className="absolute w-10 h-10 bg-red-950 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[37deg] -skew-x-[15deg]"
          //   className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[40deg] -skew-x-[6deg]"
          style={{
            left: Math.floor(structure.position.x / 30) * 30,
            top: Math.floor(structure.position.y / 30) * 30,
          }}
        >
          <Image 
            key='WoodCollecor'
            src='/Elexir_Collector.png'
            width={40}
            height={50}
            alt='png of Wood Collector'
          />
        </div>
      ))}
      {stone_mine_Array.map((structure, index) => (
        <div
          key={index + "_stone_mine"}
          className="absolute w-10 h-10 bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[37deg] -skew-x-[15deg]"
          //   className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[40deg] -skew-x-[6deg]"
          style={{
            left: Math.floor(structure.position.x / 30) * 30,
            top: Math.floor(structure.position.y / 30) * 30,
          }}
        ></div>
      ))}
    </div>
  );
}