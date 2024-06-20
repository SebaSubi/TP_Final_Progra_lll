import {
  useState,
  useEffect,
  memo,
  MutableRefObject,
  useContext,
  useRef,
} from "react";
import Image from "next/image";
import { mapPlace, DefaultMap } from "./mapData";
import { useBuldingContext } from "./BuildingContext";
import Building from "./building";
import { getUserBuildings, postUserBuildings } from "../server/userBuilding";
import { useSession } from "next-auth/react";
import { getUserInstanceById } from "../server/userInstance";

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
  const building = useRef(null);

  // const [userBuildings, setUserBuildings] = useState<any[]>()
  // const [currentUser, setCurrentUser] = useState<any>()
  const context = useBuldingContext(); //this is great, it imports states from other components

  const StructureType = context.StructureType;
  const BuildMode = context.placing;
  const user = context.User;
  const occupied = context.Occupied;

  useEffect(() => {
    setIsOccupied(mapPlace.occupied);
  }, [mapPlace.occupied, mapPlace.structureType, mapPlace.strutctureID]);

  const handleClick = () => {
    if (BuildMode.current) {
      if (StructureType.current === "") {
        DefaultMap[position.row][position.column].occupied = false;
        DefaultMap[position.row][position.column].structureType = "";
        building.current = null;
        setIsOccupied(false);
      } else {
        DefaultMap[position.row][position.column].occupied = true;
        DefaultMap[position.row][position.column].structureType = "water"; //cambie esto
        building.current = "water";
        setIsOccupied(true);
      }
      // postUserBuildings(
      //   StructureType.current,
      //   user.current.userId,
      //   new Date(),
      //   { x: position.row, y: position.column }
      // );
      // BuildMode.current = false;
      // setHover(false);
    }
  };

  useEffect(() => {
    // This useEffect ensures `alreadyOccupied` runs after the component mounts
    function alreadyOccupied() {
      occupied.current.forEach((buildingItem) => {
        if (
          position.row === buildingItem.position.x &&
          position.column === buildingItem.position.y
        ) {
          DefaultMap[position.row][position.column].occupied = true;
          DefaultMap[position.row][position.column].structureType =
            buildingItem.name;
          // console.log(buildingItem)
          building.current = buildingItem;
          // console.log(building.current)
        }
      });
    }

    alreadyOccupied();
    // console.log(building.current); // Should log the updated building if it exists
  }, [occupied, position]);

  // alreadyOccupied()
  useEffect(() => {
    if (building.current) {
      console.log(building.current); // Logs the updated building after alreadyOccupied has run
    } // Logs the updated building after alreadyOccupied has run
  }, [building.current]);

  return (
    <div className="min-h-10 min-w-10 flex">
      <div
        className={`min-h-10 min-w-10 ${
          BuildMode.current
            ? hover
              ? isOccupied
                ? "bg-red-500"
                : "bg-green-500"
              : ""
            : ""
        } flex items-center justify-center select-none z-10`}
        onClick={() => {
          handleClick();
          // if (isOccupied) {
          //   setBuildingMenu(!buildingMenu);
          // }
        }}
        onMouseOver={() => {
          BuildMode.current ? setHover(true) : null;
        }}
        onMouseLeave={() => (BuildMode.current ? setHover(false) : null)}
      >
        {/* <Building buildingName={StructureType.current} /> */}
        {hover && <Building buildingName={StructureType.current.name} />}
      </div>
      {buildingMenu && building.current && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-[330px] h-[250px] bg-[#f7cd8d] border-[3px] border-[#b7632b]">
          {/* {building.current.name}< br />
        Production per minute: {building.current.prod_per_hour}<br />
        Workers: {building.current.workers} <br />
        capacity: {building.current.capacity} / {building.current.maxCapacity}  */}
        </div>
      )}
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
