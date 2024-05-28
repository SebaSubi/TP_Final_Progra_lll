"use client";
//this will be the logic for the grid map

export default function GridMap() {
  //logic for the creation of the grid map
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4">
      <div className="bg-red-500">1</div>
      <div className="bg-blue-500">2</div>
      <div className="bg-green-500">3</div>
      <div className="bg-yellow-500">4</div>
      <div className="bg-purple-500">5</div>
      <div className="bg-pink-500">6</div>
      <div className="bg-red-500">7</div>
      <div className="bg-blue-500">8</div>
      <div className="bg-green-500">9</div>
    </div>
  );
}
