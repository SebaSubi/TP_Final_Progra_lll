import { useState, useEffect } from "react";

export default function MarkPosition() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    // Agrega el event listener cuando el componente se monta
    document.addEventListener("mousemove", handleMouseMove);
    // document.addEventListener("click", () => {setvisibleBuildingDetails(false)})

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      // document.removeEventListener("click", () => {setvisibleBuildingDetails(false)})
    };
  }, []);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: Math.floor(cursorPosition.x / 30) * 30 + 7,
        top: Math.floor(cursorPosition.y / 30) * 30 + 15,
      }}
    >
      <div className="relative h-6 w-6">
        <span className="absolute bg-red-500 h-1 w-full transform rotate-45"></span>
        <span className="absolute bg-red-500 h-1 w-full transform -rotate-45"></span>
      </div>
    </div>
  );
}
