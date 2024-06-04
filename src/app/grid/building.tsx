//imports
import React, { useEffect, useState } from "react";
import Image from "next/image";

//component
function Building({ buildingName }: { buildingName: string }) {
  const [buildingImg, setBuildingImg] = useState("");

  //i could put this in a useEfeffect hook
  useEffect(() => {
    switch (buildingName) {
      case "LumberCamp":
        //   if (buildingImg != "LumberCamp") {
        setBuildingImg("/LumberCamp.png");
        //   }
        break;
      case "water":
        //   if (buildingImg != "water") {
        setBuildingImg("/minecraftWater.png");
        //   }
        break;
    }
  }, [buildingName]);

  return (
    <>
      {buildingImg && (
        <Image src={buildingImg} alt="building image" height={40} width={40} />
      )}
    </>
  );
}

export default React.memo(Building);
