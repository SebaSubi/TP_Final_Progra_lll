"use client";
import Place from "./place";
import { mapPlace, DefaultMap } from "./mapData";

export default function GridMap() {
  //   //logic for the creation of the grid map

  const places: mapPlace[][] = DefaultMap;
  let modifiedDefaultMap = DefaultMap.map((row) =>
    row.map((place) => ({
      ...place,
      structureType: place.structureType === null ? "" : place.structureType,
    }))
  );
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
