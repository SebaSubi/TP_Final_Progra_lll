import { useState, useEffect, memo, MutableRefObject } from "react";
import Image from "next/image";

function Place({
  occupied,
  text,
  BuildMode,
}: {
  occupied: boolean;
  text: string;
  BuildMode: MutableRefObject<boolean>;
}) {
  const [isOccupied, setIsOccupied] = useState(occupied);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setIsOccupied(occupied);
  }, [occupied]);

  const handleClick = () => {
    if (BuildMode.current && !occupied) setIsOccupied(true);
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
        {text}
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
