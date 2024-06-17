import { useState, useEffect, memo, MutableRefObject, useContext, useRef } from "react";
import Image from "next/image";
import { mapPlace, DefaultMap } from "./mapData";
import { useBuldingContext } from "./BuildingContext";
import Building from "./building";
import { getUserBuildings, postUserBuildings } from "../server/userBuilding";
import { useSession } from "next-auth/react";
import { getUserInstanceById } from "../server/userInstance";
import { useBuildingsStore } from "../store/userBuildings";
import { UserBuildings } from "../types";
import { useUserStore } from "../store/user";
import { updateData } from "../logic/production";


// interface BuildingType {
//   name: string;
//   prod_per_hour: number;
//   workers: number;
//   capacity: number;
//   maxCapacity: number;
// }



function Place({
  mapPlace,
  position,
}: {
  mapPlace: mapPlace;
  position: { row: number; column: number };
}) {
  const [isOccupied, setIsOccupied] = useState(mapPlace.occupied);
  const [hover, setHover] = useState(false);
  const [buildingMenu, setBuildingMenu] = useState<boolean>(false); // State to control the building menu visibility
  // const [building, setBuilding] = useState<any>(null); // State to store the selected building data
  const building = useRef<UserBuildings>();
  const userBuildings = useBuildingsStore(state => state.userBuildings);
  const user = useUserStore(state => state.user);
  // console.log(user)
  
  function updateData() {
    

    setBuildingMenu(!buildingMenu);

  }
  const context = useBuldingContext(); //this is great, it imports states from other components

  const StructureType = context.StructureType;
  const BuildMode = context.placing;


  const handleClick = async () => { 
    if (BuildMode.current && !isOccupied) {
      DefaultMap[position.row][position.column].occupied = true;
      DefaultMap[position.row][position.column].structureType =
        StructureType.current.name;
  
      try {
        const createdBuilding = await postUserBuildings(
          StructureType.current,
          user.userId,
          new Date(),
          { x: position.row, y: position.column }
        );
  
        // Update building.current with the created building
        building.current = createdBuilding;
  
        BuildMode.current = false;
        setIsOccupied(true);
        setHover(false);
      } catch (error) {
        console.error("Algo paso", error);
      }
    }
  };
  
 
  useEffect(() => {
    userBuildings.forEach((buildingItem) => {
      if (position.row === buildingItem.position.x && position.column === buildingItem.position.y) {
        DefaultMap[position.row][position.column].occupied = true;
        DefaultMap[position.row][position.column].structureType = buildingItem.name;
        building.current = buildingItem;
        setIsOccupied(true);
        }
    });
  }, []);

  // alreadyOccupied() 

  return (
    <div className="h-full w-full flex">
      <div
        className={`h-10 w-10 ${
          BuildMode.current
            ? hover
              ? isOccupied
                ? "bg-red-500"
                : "bg-green-500"
              : ""
            : ""
        } flex items-center justify-center select-none z-10`}
        onClick={() => {
          handleClick()
          if(isOccupied) {
            updateData()
          }
        }} 
        onMouseOver={() => {
          BuildMode.current ? setHover(true) : null;
        }}
        onMouseLeave={() => (BuildMode.current ? setHover(false) : null)}
      >
 
        {/* <Building buildingName={StructureType.current} /> */}
        {hover && <Building buildingName={StructureType.current.name} />}
      </div> 
      {buildingMenu && building.current && 
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-[330px] h-[250px] bg-[#f7cd8d] border-[3px] border-[#b7632b]">
        {building.current.name}< br />
        Production per minute: {building.current.prod_per_hour}<br />
        Workers: {building.current.workers} <br />
        capacity: {building.current.capacity} / {building.current.maxCapacity} 
      </div>} 
   
      <Image
        className="absolute z-[9]"
        src={"/grassTop.jpg"}
        width={40}
        height={40}
        alt="minecraft_grass_top"
      />
      {isOccupied && (
        <div className="z-[9] absolute">
          <Building
            buildingName={
              DefaultMap[position.row][position.column].structureType
            }
          />
        </div>
      )}
    </div>
  );
}

export default memo(Place);
