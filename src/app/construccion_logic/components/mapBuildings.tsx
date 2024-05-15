import { useState } from "react";
import {
  glod_mine_Array,
  lumber_camp_Array,
  stone_mine_Array,
  barracs_Array,
} from "../utils/StructuresData";
import Image from "next/image";
import BuildingDetails from "./building";
import Collectors from "@/app/collectors/objects/collector";

const defaultBuilding: Collectors = {
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
  position: { x: 0, y: 0 },
  boost: false,
  maxCapacity: 200,
  updateTime: new Date()
};

export default function MapBuildings() {
  const [visibleBuildingDetails, setvisibleBuildingDetails] = useState(false);
  const [BuldingInformation, setBuldingInformation] = useState(defaultBuilding);

  function buildingData(index: number) {
    const building = lumber_camp_Array.find(
      (collector) => collector.id === index
    );

    if (building) {
      setBuldingInformation(building);
      setvisibleBuildingDetails(!visibleBuildingDetails);
      // console.log(building)
      // console.log(visibleBuildingDetails)
    }
  }
  return (
    <div>
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
          {/* {structure.img} */}
          <BuildingDetails
            collector={BuldingInformation}
            state={visibleBuildingDetails}
            buildingId={structure.id}
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
      {barracs_Array.map((structure, index) => (
        <div
          key={index + "_barrac"}
          className="absolute justify-center items-center"
          //   className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[40deg] -skew-x-[6deg]"
          style={{
            left: Math.floor(structure.position.x / 30) * 30,
            top: Math.floor(structure.position.y / 30) * 30,
          }}
        >
          <Image
            key="Barrac"
            src="/Barracs.png"
            width={45}
            height={55}
            alt="png of Barrac"
          />
        </div>
      ))}
    </div>
  );
}
