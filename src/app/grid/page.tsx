"use client";

import GridMap from "./gridMap";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import SideBar from "../construccion_logic/components/sideBar";
import { useSession } from "next-auth/react";
import { useBuldingContext, BuildingContext } from "./BuildingContext";
import MessageSection from "../construccion_logic/components/messages";
import InboxSection from "../construccion_logic/components/buzon";
import { signOut } from "next-auth/react";
import { useUserStore } from "../store/user";
import { useBuildingsStore } from "../store/userBuildings";
import { user } from "../construccion_logic/page";

// export const BuildingContext = React.createContext<ContextProps | null>(null);

export default function GridPage() {
  const { data: session } = useSession();
  const placing = useRef(false);
  const StructureType = useRef(null);
  const User = useRef(null);
  const Occupied = useRef([]);

  // const user = useUserStore(state => state.user);
  // const userBuildings = useBuildingsStore(state => state.userBuildings);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const fetchUserBuildings = useBuildingsStore((state) => state.fetchBuildings);

  useEffect(() => {
    if ((session?.user as any)?._id) {
      fetchUser((session?.user as any)._id);
      fetchUserBuildings((session?.user as any)._id);
    }
  }, [session, fetchUser, fetchUserBuildings]);

  // console.log(userBuildings)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "http://localhost:3000" });
  };

  return (
    <BuildingContext.Provider
      value={{ StructureType, placing, User, Occupied }}
    >
      <SideBar userId={(session?.user as any)?._id} />

      {/* <Image src={"/background_easter_egg.jpg"} alt="que miras bobo" fill /> */}

      <MessageSection />

      <InboxSection />

      <div className="flex items-center justify-center">
        <TransformWrapper
          maxScale={3}
          // @ts-ignore
          defaultScale={1}
          disablePadding={true}
          minScale={1}
          centerOnInit={true}
          doubleClick={{ disabled: true }}
          alignmentAnimation={{ disabled: true }}
          panning={{ velocityDisabled: true }}
        >
          <div className="absolute bottom-0 right-0 m-4 z-50">
            <button
              className="p-2 bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 h-10"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </div>
          <TransformComponent>
            <GridMap />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="fixed overflow-hidden z-[11] top-0 left-3/4 pt-2">
        <div className="flex flex-col justify-center gap-2">
          <button
            className="bg-blue-500 h-8 w-32"
            onClick={() => {
              StructureType.current = "water";
              placing.current = !placing.current;
            }}
          >
            place water
          </button>
          <button
            className="bg-amber-400 h-8 w-32"
            onClick={() => {
              StructureType.current = "";
              placing.current = !placing.current;
            }}
          >
            place grass
          </button>
        </div>
      </div>
    </BuildingContext.Provider>
  );
}
