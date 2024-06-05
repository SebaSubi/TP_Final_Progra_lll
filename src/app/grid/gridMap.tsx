"use client";
import Place from "./place";
import { mapPlace, DefaultMap } from "./mapData";
import { useBuldingContext } from "./BuildingContext";
import { useSession } from "next-auth/react";
import { getUserInstanceById } from "../server/userInstance";
import { getUserBuildings } from "../server/userBuilding";
import { useEffect } from "react";

export default function GridMap() {
  //   //logic for the creation of the grid map
  const context = useBuldingContext();
  const occupied = context.Occupied
  const user = context.User
  const { data: session } = useSession();

  async function getOccupied() {
    const instanceData = await getUserInstanceById((session?.user as any)?._id);
    user.current = instanceData
    // console.log(user.current.userId)
    if (user.current && user.current.userId) {
      const userBuildingsData = await getUserBuildings(user.current.userId);
      occupied.current = userBuildingsData;
    }
  }

  // .map((building: any) => building.position)
  getOccupied() 
   

 
  // console.log(occupied.current)
  const places: mapPlace[][] = DefaultMap;
  // let modifiedDefaultMap = DefaultMap.map((row) =>
  //   row.map((place) => ({
  //     ...place,
  //     structureType: place.structureType === null ? "" : place.structureType,
  //   }))
  // );
  // console.log(JSON.stringify(modifiedDefaultMap));

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex justify-center items-center h-screen w-screen ">
        {/* <div className="grid grid-cols-20 grid-rows-20 gap-[0.67px] "> */}
        <div className="grid grid-cols-48 grid-rows-27 ">
          {/* the values of the cols and rows of the grid are this way because the dysplay 16:9 */}
          {places.map((row, i) =>
            row.map((place, j) => (
              // here we would compare if the starting block is water and if its next to
              <div className="h-10 w-10" key={`${i}${j}`}>
                <Place mapPlace={place} position={{ row: i, column: j }} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
