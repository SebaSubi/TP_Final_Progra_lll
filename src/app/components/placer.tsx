"use client";

import Image from "next/image";
import React, { useState, useEffect, MouseEventHandler } from "react";

const Placer = () => {
  const [showCursorMarker, setShowCursorMarker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [structures, setStructures] = useState<{ x: number; y: number }[]>([]);

  const handleMouseMove: MouseEventHandler = (e) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };

  const handleClick = () => {
    console.log(cursorPosition);
    setStructures([
      ...structures,
      { x: cursorPosition.x, y: cursorPosition.y },
    ]);
    setShowCursorMarker(false);
    document.removeEventListener("click", handleClick);
  };

  const handleButtonClick = () => {
    setShowCursorMarker((current) => !current);
  };

  return (
    <div className="w-full h-full">
      <button
        className="absolute bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
        onClick={handleButtonClick}
      >
        Toggle Cursor Marker
      </button>
      {showCursorMarker && (
        <div
          className="absolute w-10 h-10 bg-green-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-45"
          //   onClick={handleClick}
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
        ></div>
      )}

      {structures.map((structure, index) => (
        <div
          key={index}
          className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-45"
          style={{ left: structure.x, top: structure.y }}
        ></div>
      ))}
      <Image
        src="/Map_Classic_Scenery.jpg"
        alt="clash_map"
        width={2000}
        height={500}
        onClick={() => {
          showCursorMarker ? handleClick() : null;
        }}
        onMouseMove={handleMouseMove}
        className="inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default Placer;

//66 494
//104 512

//1100, 800 --> 38, 503
