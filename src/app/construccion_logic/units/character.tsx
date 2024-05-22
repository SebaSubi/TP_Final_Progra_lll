"use client";

import { useState, useEffect, MutableRefObject } from "react";
import Image from "next/image";

export default function Character({
  reference,
}: {
  reference: MutableRefObject<{
    x: number;
    y: number;
  }>;
}) {
  const [unitPosition, setUnitPosition] = useState({ x: 500, y: 500 });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUnitPosition({ ...reference.current }); // Crea una copia del objeto para forzar una actualización de estado
    }, 5);

    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    };
  }, []);

  return (
    <div
      className="absolute"
      style={{
        left: unitPosition.x,
        top: unitPosition.y,
      }}
    >
      <Image src={"/creeper.png"} width={25} height={25} alt="png of Creeper" />
    </div>
  );
}