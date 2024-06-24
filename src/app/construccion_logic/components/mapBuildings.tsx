import { Dispatch, SetStateAction, useState } from "react";
import {
  glod_mine_Array,
  lumber_camp_Array,
  stone_mine_Array,
  barracs_Array,
} from "../utils/StructuresData";
import Image from "next/image";
import BuildingDetails from "./building";
import Collectors from "@/app/collectors/objects/collector";
import Barracs from "@/app/collectors/objects/barracs";
import Collector from "@/app/collectors/components/resourceLogic";
import BarracsMenu from "./barracsMenu";
import { placerApear, user } from "../page";
import { units } from "./progressbar";
import Unit from "../units/units";

export default function MapBuildings({
  setBarracsMenu,
  barracMenu,
  building,
  placed,
  structure,
}: {
  setBarracsMenu: Dispatch<SetStateAction<boolean>>,
  barracMenu: boolean,
  building: any,
  placed: boolean,
  structure: any
}) {
  const [visibleBuildingDetails, setVisibleBuildingDetails] = useState(false);
  const [visibleBarracsDetails, setVisibleBarracsDetails] = useState(false);
  const [BuildingInformation, setBuildingInformation] = useState<any>();

  function collectorData(building1: any) {
    if (building1.buildings) {
      setBuildingInformation(building);
      setVisibleBuildingDetails(!visibleBuildingDetails);
    }
  }

  function barracsMenu(index: number) {
    const barracs = barracs_Array.find((barracs) => barracs.id === index);
    if (barracs) {
      setVisibleBarracsDetails(!visibleBarracsDetails);
    }
  }

  if (building.name) {
    return (
      <div
        className="absolute justify-center items-center"
        style={{
          left: Math.floor(building.position.x / 30) * 30,
          top: Math.floor(building.position.y / 30) * 30,
        }}
      >
        <i onClick={() => collectorData(building)} style={{ pointerEvents: 'auto' }}>
          <Image
            key={building.name}
            src={building.img}
            width={40}
            height={50}
            alt={`png of ${building.name}`}
          />
        </i>

        <BuildingDetails
          collector={BuildingInformation}
          state={visibleBuildingDetails}
          buildingId={building.id}
        />
      </div>
    );
  } else if (structure && placed) {
    return (
      <div
        className="absolute justify-center items-center"
        style={{
          left: Math.floor(building.x / 30) * 30,
          top: Math.floor(building.y / 30) * 30,
        }}
      >
        <i onClick={() => collectorData(structure)} style={{ pointerEvents: 'auto' }}>
          <Image
            key={structure.name}
            src={structure.img}
            width={40}
            height={50}
            alt={`png of ${structure.name}`}
          />
        </i>

        <BuildingDetails
          collector={BuildingInformation}
          state={visibleBuildingDetails}
          buildingId={building.id}
        />
      </div>
    );
  }

  return null;
}



// import { Dispatch, SetStateAction, useState } from "react";
// import {
//   glod_mine_Array,
//   lumber_camp_Array,
//   stone_mine_Array,
//   barracs_Array,
// } from "../utils/StructuresData";
// import Image from "next/image";
// import BuildingDetails from "./building";
// import Collectors from "@/app/collectors/objects/collector";
// // import BarracsMenu from "./barracsMenu";
// import Barracs from "@/app/collectors/objects/barracs";
// import Collector from "@/app/collectors/components/resourceLogic";
// import BarracsMenu from "./barracsMenu";
// import { placerApear, user } from "../page";
// import { units } from "./progressbar";
// import Unit from "../units/units";

// const defaultBuilding: Collectors = {
//   id: 2,
//   name: "Wood Collector",
//   img: (
//     <Image
//       key="WoodCollecor"
//       src="/LumberCamp.png"
//       width={60}
//       height={70}
//       alt="png of Wood Collector"
//     />
//   ),
//   cost: 100,
//   prod_per_hour: 1,
//   workers: 1,
//   level: 1,
//   unlock_level: 1,
//   maxWorkers: 1,
//   position: { x: 0, y: 0 },
//   boost: false,
//   maxCapacity: 200,
//   updateTime: new Date()
// };

// const defaultBarracs: Barracs = {
//   id: 1,
//   name: 'Barracs',
//   cost: 5,
//   producing: '',
//   img: (
//     <Image
//       key="BattasImg"
//       src="/Barracs.png"
//       width={60}
//       height={70}
//       alt="png of the Barracs"
//     />
//   ),
//   prod_per_hour: 1,
//   workers: 1,
//   level: 1,
//   unlock_level: 1,
//   maxWorkers: 10,
//   maxCap: 20,
//   position: {x: 0, y: 0}



// }

// export default function MapBuildings(
//   { setBarracsMenu, barracMenu, building, placed, structure }: { setBarracsMenu: Dispatch<SetStateAction<boolean>>, barracMenu: boolean, building: any, placed: boolean, structure: any }
// ) {
//   const [visibleBuildingDetails, setvisibleBuildingDetails] = useState(false);
//   const [visibleBarracsDetails, setvisibleBarracsDetails] = useState(false)
//   // const [barracsInfo, setBarracsInformation] = useState(defaultBarracs) //HAVE TO MAKE THIS WORK WITH DB
//   const [BuldingInformation, setBuldingInformation] = useState(); //HAVE TO MAKE THIS WORK WITH DB
//   // const [barracsMenu, setBarracsMenu] = useState(false)

//   function collectorData(building1: any) {
//     if (building1.buildings) {
//       setBuldingInformation(building);
//       setvisibleBuildingDetails(!visibleBuildingDetails);
//     } 
//   }

  
//   function barracsMenu(index: number) {

//     const barracs = barracs_Array.find(
//       (barracs) => barracs.id === index
//     )
//     if (barracs) {
//       // setBarracsInformation(barracs);
//       setvisibleBarracsDetails(!visibleBarracsDetails);
//     }
//   }
//  //if building.name, it means that its a bulding being brought from the DB,
//  //else, it means you are bringing the object for the position
//   if(building.name) {
//     // setPlacerApear({beingPlaced: false, placed: false})
//     return (
//       <div
//         // key={index + "_wooden_collector"}
//         className="absolute justify-center items-center"
//         // className="absolute w-10 h-10 bg-red-950 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[37deg] -skew-x-[15deg]"
//         //   className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[40deg] -skew-x-[6deg]"
//         style={{
//           left: Math.floor(building.position.x / 30) * 30,
//           top: Math.floor(building.position.y / 30) * 30,
//         }}
          
//       >
//         <i onClick={() => collectorData(building)} >
//           <Image
//             key={building.name}
//             src={building.img}
//             width={40}
//             height={50}
//             alt={`png of ${building.name}`}
//           />
//         </i>
          
//         <BuildingDetails
//           collector={BuldingInformation}
//           state={visibleBuildingDetails}
//           buildingId={building.id}
//         />
//       </div>
//     );
//   } else if (structure && placed){
//     return (
      
//       <div
//         // key={index + "_wooden_collector"}
        
//         className="absolute justify-center items-center"
//         // className="absolute w-10 h-10 bg-red-950 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[37deg] -skew-x-[15deg]"
//         //   className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[40deg] -skew-x-[6deg]"
//         style={{
//           left: Math.floor(building.x / 30) * 30,
//           top: Math.floor(building.y / 30) * 30,
//         }}
          
//       >
//         <i onClick={() => collectorData(structure)} >
//         <Image
//           key={structure.name}
//           src={structure.img}
//           width={40}
//           height={50}
//           alt={`png of ${structure.name}`}
//         />
//         </i>
          
//         <BuildingDetails
//           collector={BuldingInformation}
//           state={visibleBuildingDetails}
//           buildingId={building.id}
//         />
//       </div>
//     );
//   }
  
// }
