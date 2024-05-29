"use client";
import Place from "./place";

export default function GridMap() {
  //logic for the creation of the grid map
  const places: string[][] = [];
  for (let i = 0; i < 20; i++) {
    places.push([]);
    for (let j = 0; j < 20; j++) {
      places[i].push(`${i * 20 + j}`);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="grid grid-cols-20 grid-rows-20 gap-[0.67px] ">
        {places.map((row, i) =>
          row.map((place, j) => (
            // <div
            //   key={`${i}${j}`}
            //   className="bg-green-600 flex items-center justify-center h-10 w-10"
            // >
            //   {/* <div key={`${i}${j}`} className="bg-green-500 h-10 w-10"> */}
            //   {place}
            // </div>
            <Place key={`${i}${j}`} occupied={false} text={place} />
          ))
        )}
      </div>
    </div>
  );
}
