"use client";
import { use, useRef } from "react";
import Place from "./place";
import { mapPlace, DefaultMap } from "./mapData";

// type mapPlace = {
//   occupied: boolean;
//   structureType: number | null;
//   strutctureID: number | null;
//   text: string;
// };

export default function GridMap() {
  //   //logic for the creation of the grid map
  const placing = useRef(false);
  const StructureId = useRef(0);
  const places: mapPlace[][] = DefaultMap;

  // for (let i = 0; i < 48; i++) {
  //   for (let j = 0; j < 27; j++) {
  //     places[i][j].occupied = placing.current;
  //   }
  // }
  //   for (let i = 0; i < 48; i++) {
  //     places.push([]);
  //     for (let j = 0; j < 27; j++) {
  //       places[i].push({
  //         occupied: false,
  //         structureType: null,
  //         strutctureID: null,
  //         text: `${i * 27 + j}`,
  //       });
  //     }
  //   }

  const handleClick = (rowIndex: number, colIndex: number) => {
    alert(`You clicked row ${rowIndex + 1}, column ${colIndex + 1}`);
  };

  return (
    <div className="flex-row h-screen w-screen">
      <div className="flex flex-col justify-center gap-2">
        <button
          className="bg-blue-500 h-8 w-32"
          onClick={() => {
            placing.current = !placing.current;
            // console.log(placing.current);
            // console.log(JSON.stringify(places));
          }}
        >
          place water
        </button>
        <button
          className="bg-amber-400 h-8 w-32"
          onClick={() => {
            placing.current = !placing.current;
            // console.log(placing.current);
            // console.log(JSON.stringify(places));
          }}
        >
          place structure
        </button>
      </div>
      <div className="flex justify-center items-center h-screen w-screen ">
        {/* <div className="grid grid-cols-20 grid-rows-20 gap-[0.67px] "> */}
        <div className="grid grid-cols-48 grid-rows-27 ">
          {/* the values of the cols and rows of the grid are this way because the dysplay 16:9 */}
          {places.map((row, i) =>
            row.map((place, j) => (
              // here we would compare if the starting block is water and if its next to
              <div
                className="h-10 w-10"
                key={`${i}${j}`}
                // onClick={() => handleClick(i, j)}
              >
                <Place
                  mapPlace={place}
                  position={{ row: i, colomn: j }}
                  BuildMode={placing}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
