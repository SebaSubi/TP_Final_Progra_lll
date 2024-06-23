//imports
import React, { useEffect, useState } from "react";
import Image from "next/image";

//component
function Building({ buildingName }: { buildingName: string }) {
  const [buildingImg, setBuildingImg] = useState("");

  //i could put this in a useEfeffect hook
  useEffect(() => {
    switch (buildingName) {
      case "Lumber Camp":
        //   if (buildingImg != "LumberCamp") {
        setBuildingImg("/LumberCamp.png");
        //   }
        break;
      case "water":
        //   if (buildingImg != "water") {
        setBuildingImg("/minecraftWater.png");
        //   }
        break;
      case "Gold Mine":
        setBuildingImg("/Gold_Mine.png");
        break;
      case "Barracs":
        setBuildingImg("/Barracs.png");
        break;
      case "Stone Mine":
        setBuildingImg("/StoneMine.png");
        break;
    }
  }, [buildingName]);

  return (
    <div className="flex items-center justify-center min-h-10 min-w-10">
      {buildingImg &&
        (buildingImg === "/LumberCamp.png" ? (
          <img
            src={buildingImg}
            alt="building image"
            height={40}
            width={37.5}
          />
        ) : (
          <img src={buildingImg} alt="building image" height={40} width={40} />
        ))}
    </div>
  );
}

export default React.memo(Building);
