"use client";

import GridMap from "./gridMap";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import SideBar from "../construccion_logic/components/sideBar";
import { useSession } from "next-auth/react";
import { useBuldingContext, BuildingContext } from "./BuildingContext";
import MessageSection from "../construccion_logic/components/messages"
import InboxSection from "../construccion_logic/components/buzon";
import { signOut } from 'next-auth/react';


// export const BuildingContext = React.createContext<ContextProps | null>(null);

export default function GridPage() {
  const { data: session } = useSession();
  const placing = useRef(false);
  const StructureType = useRef(null);
  const User = useRef(null)
  const Occupied = useRef([])

  // console.log((session?.user as any)?._id)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: 'http://localhost:3000' });
  };

  return (
    <BuildingContext.Provider value={{ StructureType, placing, User, Occupied }}>
      <SideBar userId={(session?.user as any)?._id} />
      <div className="flex flex-row items-center justify-center h-screen w-screen ">
        {/* <div className="flex flex-col justify-center gap-2">
          <button
            className="bg-blue-500 h-8 w-32"
            onClick={() => {
              if (StructureType.current === "water") {
                placing.current = !placing.current;
              } else {
                StructureType.current = "water";
              }
              console.log(StructureType.current);
            }}
          >
            place water
          </button>
          <button
            className="bg-amber-400 h-8 w-32"
            onClick={() => {
              if (StructureType.current === "LumberCamp") {
                placing.current = !placing.current;
              } else {
                StructureType.current = "LumberCamp";
              }
              console.log(placing.current);
            }}
          >
            place structure
          </button>
        </div> */}
        {/* <Image src={"/background_easter_egg.jpg"} alt="que miras bobo" fill /> */}

        <div className="absolute bottom-0 right-0 m-4 z-50">
          <button className="p-2 bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 h-10" onClick={handleSignOut}>
              Logout
          </button>
        </div>

        <MessageSection/>
        <InboxSection/>

        <TransformWrapper
          //TODO:
          //add the zoom in and out buttons
          // make a way so that the buttons and sidebar dont move in or out with the zoom, they have to remain static

          maxScale={3}
          //@ts-ignore
          defaultScale={0.8}
          defaultPositionX={0}
          defaultPositionY={0}
          minScale={0.8}
          doubleClick={{ disabled: true }}
          alignmentAnimation={{ disabled: true }}
          panning={{ velocityDisabled: true }}
          // zoomAnimation={{ disabled: true }}
        >
          <TransformComponent>
            <GridMap />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </BuildingContext.Provider>
  );
}
