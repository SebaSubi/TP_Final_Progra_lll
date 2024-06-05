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
    <div className="flex flex-row w-[1920px]">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-48 grid-rows-27 ">
          {places.map((row, i) =>
            row.map((place, j) => (
              <div className="min-h-10 min-w-10" key={`${i}${j}`}>
                <Place mapPlace={place} position={{ row: i, column: j }} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
