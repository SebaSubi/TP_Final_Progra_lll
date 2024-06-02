"use client";

import GridMap from "./gridMap";
import Image from "next/image";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function tryGrid() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
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
  );
}
