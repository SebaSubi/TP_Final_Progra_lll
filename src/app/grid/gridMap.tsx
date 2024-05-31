"use client";
import { useRef } from "react";
import Place from "./place";

export default function GridMap() {
  //logic for the creation of the grid map
  const placing = useRef(false);
  const places: string[][] = [];
  for (let i = 0; i < 20; i++) {
    places.push([]);
    for (let j = 0; j < 20; j++) {
      places[i].push(`${i * 20 + j}`);
    }
  }

  const handleClick = (rowIndex: number, colIndex: number) => {
    alert(`You clicked row ${rowIndex + 1}, column ${colIndex + 1}`);
  };

  return (
    <>
      <button
        className="bg-red-500 h-8"
        onClick={() => {
          placing.current = !placing.current;
          console.log(placing.current);
        }}
      >
        place something :)
      </button>
      <div className="flex justify-center items-center h-screen ">
        <div className="grid grid-cols-20 grid-rows-20 gap-[0.67px] ">
          {places.map((row, i) =>
            row.map((place, j) => (
              // here we would compare if the starting block is water and if its next to
              <div
                className="h-10 w-10"
                key={`${i}${j}`}
                // onClick={() => handleClick(i, j)}
              >
                <Place occupied={false} text={place} BuildMode={placing} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
