import { useState, useEffect, memo, MutableRefObject } from "react";
import Image from "next/image";
import { mapPlace, DefaultMap } from "./mapData";

function Place({
  mapPlace,
  position,
  BuildMode,
}: {
  mapPlace: mapPlace;
  position: { row: number; colomn: number };
  BuildMode: MutableRefObject<boolean>;
}) {
  const [isOccupied, setIsOccupied] = useState(mapPlace.occupied);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setIsOccupied(mapPlace.occupied);
  }, [mapPlace.occupied, mapPlace.structureType, mapPlace.strutctureID]);

  const handleClick = () => {
    if (BuildMode.current && !isOccupied) {
      // setIsOccupied(true);   //this is not really necesary since the prop will automaticaly rerender the component because we're modifing the orignal array
      DefaultMap[position.row][position.colomn].occupied = true;
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
        {mapPlace.text}
      </div>

      {/* <Image    //this is going tio be the building i the place
        className="absolute z-[9]"
        src={isOccupied ? "/minecraftWater.png" : "/minecraft_grass_top.png"}
        width={40}
        height={40}
        alt="minecraft_grass_top"
      /> */}

      <Image
        className="absolute z-[9]"
        src={isOccupied ? "/minecraftWater.png" : "/minecraft_grass_top.png"}
        width={40}
        height={40}
        alt="minecraft_grass_top"
      />
    </div>
  );
}

export default memo(Place);
