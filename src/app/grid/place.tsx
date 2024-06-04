import { useState, useEffect, memo, MutableRefObject, useContext } from "react";
import Image from "next/image";
import { mapPlace, DefaultMap } from "./mapData";
import { BuildingContext } from "./page";
import SideBar from "../construccion_logic/components/sideBar";

function Place({
  mapPlace,
  position,
}: {
  mapPlace: mapPlace;
  position: { row: number; column: number };
}) {
  const [isOccupied, setIsOccupied] = useState(mapPlace.occupied);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setIsOccupied(mapPlace.occupied);
  }, [mapPlace.occupied, mapPlace.structureType, mapPlace.strutctureID]);

  const context = useContext(BuildingContext); //this is great, it imports states from other components

  const StructureType = context!.StructureType;
  const BuildMode = context!.placing;

  const handleClick = () => {
    if (BuildMode.current && !isOccupied) {
      // setIsOccupied(true);   //this is not really necesary since the prop will automaticaly rerender the component because we're modifing the orignal array
      DefaultMap[position.row][position.column].occupied = true;
      DefaultMap[position.row][position.column].structureType =
        StructureType.current;
      // StructureType.current = 0;
    }
  };

  return (
    <div className="h-full w-full flex">
      <div
        className={`h-full w-full ${
          BuildMode.current
            ? hover
              ? isOccupied
                ? "bg-red-500"
                : "bg-green-500"
              : ""
            : ""
        } flex items-center justify-center select-none z-10`}
        onClick={handleClick}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* {mapPlace.text} */}
      </div>

      {/* <Image    //this is going tio be the building i the place
        className="absolute z-[9]"
        src={isOccupied ? "/minecraftWater.png" : "/minecraft_grass_top.png"}
        width={40}
        height={40}
        alt="minecraft_grass_top"
      /> */}

      {isOccupied ? (
        DefaultMap[position.row][position.column].structureType != "" ? (
          DefaultMap[position.row][position.column].structureType ===
          "water" ? (
            <Image
              className="absolute z-[9]"
              src={"/minecraftWater.png"}
              width={40}
              height={40}
              alt="minecraft_grass_top"
            />
          ) : (
            <>
              <Image
                className="absolute z-[9]"
                src={"/minecraft_grass_top.png"}
                width={40}
                height={40}
                alt="minecraft_grass_top"
              />
              <Image //this hast to change for the building image
                className="absolute z-[9]"
                src={"/LumberCamp.png"}
                width={40}
                height={40}
                alt="building_x"
              />
            </>
          )
        ) : null
      ) : (
        <Image
          className="absolute z-[9]"
          src={"/minecraft_grass_top.png"}
          width={40}
          height={40}
          alt="minecraft_grass_top"
        />
      )}
    </div>
  );
}

export default memo(Place);
