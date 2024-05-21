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
// import BarracsMenu from "./barracsMenu";
import Barracs from "@/app/collectors/objects/barracs";
import Collector from "@/app/collectors/components/resourceLogic";

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

const defaultBarracs: Barracs = {
  id: 1,
  name: 'Barracs',
  cost: 5,
  producing: '',
  img: (
    <Image
      key="BattasImg"
      src="/Barracs.png"
      width={60}
      height={70}
      alt="png of the Barracs"
    />
  ),
  prod_per_hour: 1,
  workers: 1,
  level: 1,
  unlock_level: 1,
  maxWorkers: 10,
  maxCap: 20,
  position: {x: 0, y: 0}



}

export default function MapBuildings() {
  const [visibleBuildingDetails, setvisibleBuildingDetails] = useState(false);
  const [visibleBarracsDetails, setvisibleBarracsDetails] = useState(false)
  const [barracsInfo, setBarracsInformation] = useState(defaultBarracs)
  const [BuldingInformation, setBuldingInformation] = useState(defaultBuilding);
  // const [barracsMenu, setBarracsMenu] = useState(false)

  function collectorData(index: number) {

    const building = lumber_camp_Array.find(
      (collector) => collector.id === index
    )
    if (building) {
      setBuldingInformation(building);
      setvisibleBuildingDetails(!visibleBuildingDetails);
      // console.log(building)
      // console.log(visibleBuildingDetails)
    }
  }

  
  function barracsMenu(index: number) {

    const barracs = barracs_Array.find(
      (barracs) => barracs.id === index
    )
    if (barracs) {
      setBarracsInformation(barracs);
      setvisibleBarracsDetails(!visibleBarracsDetails);
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
          
        >
          <i onClick={() => collectorData(index)} >
          <Image
            key="WoodCollecor"
            src="/Elexir_Collector.png"
            width={40}
            height={50}
            alt="png of Wood Collector"
          />
          </i>
          
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
          onClick={() => barracsMenu(index)}

        >
          <Image
            key="Barrac"
            src="/Barracs.png"
            width={45}
            height={55}
            alt="png of Barrac"
          />
          {/* <BarracsMenu 
            barracs={barracsInfo} 
            state={visibleBarracsDetails} 
            barracsId={structure.id} 
          /> */}
        </div>
      ))}
    </div>
  );
}
