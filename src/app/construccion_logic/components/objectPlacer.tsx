"use client";
// import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  glod_mine_Array,
  lumber_camp_Array,
  stone_mine_Array,
  Structure,
} from "../utils/StructuresData";
import Image from "next/image";
import I1 from '../../public/Level1_Elixir.png'
import I2 from '../../public/Level2_Elixir.png'
import I3 from '../../public/Level3_Elixir.png'	
import I4 from '../../public/Level4_Elixir.png'
import BuildingDetails from "./building";
import Collectors from "@/app/collectors/objects/collector";
	




export default function Placer(props: {
  appearence: boolean;
  structure: number | null;
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleBuildingDetails, setvisibleBuildingDetails] = useState(false)
  const [BuldingInformation, setBuldingInformation] = useState<Collectors>
  (
    {
      id: 2,
      name: "Wood Collector",
      img: (
        <Image
          key="WoodCollecor"
          src="/Elexir_Collector.png"
          width={60}
          height={70}
          alt="png of Wood Collector"
        />
      ),
      cost: 100,
      prod_per_hour: 1,
      workers: 1,
      level: 1,
      unlock_level: 1,
      maxWorkers: 1,
      position:{x:0, y:0},
  
    }
  )
  
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

  function buildingData(index:number) {
    const building = lumber_camp_Array.find( (collector) => collector.id === index )
    
    if(building){
      setBuldingInformation(building);
      setvisibleBuildingDetails(!visibleBuildingDetails);
      // console.log(building)
      // console.log(visibleBuildingDetails)
    }
    
  }




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

  return (
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
              src="/Elexir_Collector.png"
              width={40}
              height={50}
              alt="png of Wood Collector"
            />
            <div className="absolute w-10 h-10 bg-green-500 rotate-[38deg] -skew-x-[15deg] z-10 mt-3" />
          </div>
        </div>
      )}

      {glod_mine_Array.map((collector, index) => (
        <div
          key={index + "_gold_mine"}
          className="absolute w-10 h-10 bg-yellow-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[37deg] -skew-x-[15deg] mr-5 mt -5"
          //   className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[40deg] -skew-x-[6deg]"
          style={{
            left: Math.floor(collector.position.x / 30) * 30,
            top: Math.floor(collector.position.y / 30) * 30,
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
          onClick={() => buildingData(index)}
        >
          <Image
            key="WoodCollecor"
            src="/Elexir_Collector.png"
            width={40}
            height={50}
            alt="png of Wood Collector"
          />
            <BuildingDetails collector={BuldingInformation} state={visibleBuildingDetails} buildingId={structure.id}/>
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
