"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import I1 from "../../public/Level1_Elixir.png";
import I2 from "../../public/Level2_Elixir.png";
import I3 from "../../public/Level3_Elixir.png";
import I4 from "../../public/Level4_Elixir.png";

export default function Placer(props: {
  appearence: boolean;
  structure: any;
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [visibleBuildingDetails, setvisibleBuildingDetails] = useState(false);

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //         setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  //     }, 3000)

  //     return () => clearInterval(intervalId);
  // }, [])

  // const[]

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    // Agrega el event listener cuando el componente se monta
    document.addEventListener("mousemove", handleMouseMove);
    // document.addEventListener("click", () => {setvisibleBuildingDetails(false)})

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      // document.removeEventListener("click", () => {setvisibleBuildingDetails(false)})
    };
  }, []);

  // const images = [I1, I2, I3, I4]

  // function buildingAnimation() {
  //   return (
  //       <div>
  //         <div className="flex items-center justify-center">
  //           <Image src={images[currentIndex]} alt="Level 1 Elixir" />
  //         </div>
  //       </div>
  //   );
  // }

  const structure_images = {
    1: "Gold_Mine1.png",
    2: "Elexir_Collector.png",
    3: "Barracs.png",
  };

  const img_prop: string = props.structure
    ? //@ts-ignore  // i dont know why this is not working
      structure_images[props.structure]
    : structure_images[1];

  return (
    //hay que mover los arrays a otro componente porque se regenra siempre que movemos el mouse.
    <div>
      {props.appearence && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: Math.floor(cursorPosition.x / 30) * 30,
            top: Math.floor(cursorPosition.y / 30) * 30,
          }}
        >
          <div className="flex flex-col">
            <Image
              className="realtive justify-center items-center z-20"
              src={props.structure.img}
              width={40}
              height={50}
              alt="structure to place"
            />
            <div className="absolute w-10 h-10 bg-green-500 rotate-[38deg] -skew-x-[15deg] z-10 mt-3" />
          </div>
        </div>
      )}
    </div>
  );
}
