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
  const occupied = context.Occupied;
  const user = context.User;
  const { data: session } = useSession();

  async function getOccupied() {
    const instanceData = await getUserInstanceById((session?.user as any)?._id);
    user.current = instanceData;
    // console.log(user.current.userId)
    if (user.current && user.current.userId) {
      const userBuildingsData = await getUserBuildings(user.current.userId);
      occupied.current = userBuildingsData;
    }
  }

  // .map((building: any) => building.position)
  getOccupied();
  //zustand
  //jotai

  // console.log(occupied.current)
  // const places: mapPlace[][] = DefaultMap;

  const places: mapPlace[][] = [];

  for (let i = 0; i < 48; i++) {
    const row: mapPlace[] = [];
    for (let j = 0; j < 23; j++) {
      row.push({
        occupied: false,
        structureType: "",
        strutctureID: null,
        text: `${i * 48 + j}`,
      });
    }
    places.push(row);
  }
  // let modifiedDefaultMap = DefaultMap.map((row) =>
  //   row.map((place) => ({
  //     ...place,
  //     structureType: place.structureType === null ? "" : place.structureType,
  //   }))
  // );
  // console.log(JSON.stringify(modifiedDefaultMap));

  return (
    <div className="flex justify-center items-center min-w-[1920px] h-screen">
      <div className="grid grid-cols-48 grid-rows-22 gap-0">
        {places.map((row, i) =>
          row.map((place, j) => (
            <div className="min-h-10 min-w-10" key={`${i}${j}`}>
              <Place mapPlace={place} position={{ row: i, column: j }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
