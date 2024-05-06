"use client";

import React, { useState, useEffect } from "react";

const Placer = () => {
  const [showCursorMarker, setShowCursorMarker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [structures, setStructures] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.pageX, y: e.pageY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
    setShowCursorMarker(!showCursorMarker);
    document.addEventListener("click", handleClick);
  };

  return (
    <div>
      <button
        className="absolute bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
        onClick={handleButtonClick}
      >
        Toggle Cursor Marker
      </button>
      {showCursorMarker && (
        <div
          className="absolute w-10 h-10 bg-green-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-45"
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
    </div>
  );
};

export default Placer;

//66 494
//104 512

//1100, 800 --> 38, 503
