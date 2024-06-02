"use client";

import GridMap from "./gridMap";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface ContextProps {
  StructureType: React.MutableRefObject<number>;
  placing: React.MutableRefObject<boolean>;
}

export const BuildingContext = React.createContext<ContextProps | null>(null);

export default function tryGrid() {
  const placing = useRef(false);
  const StructureType = useRef(0);

  return (
    <BuildingContext.Provider value={{ StructureType, placing }}>
      <div className="flex flex-row items-center justify-center h-screen w-screen">
        <div className="flex flex-col justify-center gap-2">
          <button
            className="bg-blue-500 h-8 w-32"
            onClick={() => {
              placing.current = !placing.current;
              StructureType.current = -1;
              console.log(placing.current);
              console.log(StructureType.current);
              // console.log(JSON.stringify(places));
            }}
          >
            place water
          </button>
          <button
            className="bg-amber-400 h-8 w-32"
            onClick={() => {
              placing.current = !placing.current;
              StructureType.current = 1;
              console.log(placing.current);
              // console.log(JSON.stringify(places));
            }}
          >
            place structure
          </button>
        </div>
        {/* <Image src={"/background_easter_egg.jpg"} alt="que miras bobo" fill /> */}
        {/* <TransformWrapper
          //TODO:
          //add the zoom in and out buttons
          // make a way so that the buttons and sidebar dont move in or out with the zoom, they have to remain static

          maxScale={3}
          //@ts-ignore
          defaultScale={1}
          defaultPositionX={0}
          defaultPositionY={0}
          minScale={1}
        >
          <TransformComponent> */}
        <GridMap />
        {/* </TransformComponent>
        </TransformWrapper> */}
      </div>
    </BuildingContext.Provider>
  );
}
