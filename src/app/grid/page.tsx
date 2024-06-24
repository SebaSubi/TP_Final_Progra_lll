"use client";

import GridMap from "./gridMap";
import Image from "next/image";
import React, { useRef, useEffect, Suspense, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import SideBar from "../construccion_logic/components/sideBar";
import { useSession } from "next-auth/react";
import { useBuldingContext, BuildingContext } from "./BuildingContext";
import MessageSection from "../construccion_logic/components/messages";
import InboxSection from "../construccion_logic/components/buzon";
import { signOut } from "next-auth/react";
import { useUserStore } from "../store/user";
import { useBuildingsStore } from "../store/userBuildings";
import LoadingScreen from "./components/loadingScreen";
import { UserBuildings } from "../types";
import { useBoostStore } from "../store/boosts";
import BoostMenu from "./components/boostMenu";
import { getUserInstanceById } from "../server/userInstance";
import { setMap } from "../worldMap/continents";
import PlayerGold from "./components/materials";

// export const BuildingContext = React.createContext<ContextProps | null>(null);

export default function GridPage() {
  const { data: session } = useSession();
  const placing = useRef(false);
  const StructureType = useRef(null);
  // const User = useRef(null)
  const Occupied = useRef([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = useUserStore((state) => state.fetchUser);
  const fetchUserBuildings = useBuildingsStore((state) => state.fetchBuildings);
  const fetchBoost = useBoostStore((state) => state.fetchBoosts);
  const user = useUserStore((state) => state.user);

  const userBuildings = useBuildingsStore((state) => state.userBuildings);

  useEffect(() => {
    if ((session?.user as any)?._id) {
      fetchUser((session?.user as any)._id);
      fetchUserBuildings((session?.user as any)._id);
      fetchBoost((session?.user as any)._id);
    }
  }, [session, fetchUser, fetchUserBuildings]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (user) {
    setMap(user.country);
  }

  return (
    <>
      {loading ? (
        <LoadingScreen setLoading={setLoading} />
      ) : (
        <BuildingContext.Provider value={{ StructureType, placing, Occupied }}>
          {/* <BoostMenu /> */}
          <SideBar />
          <div className="flex flex-row items-center justify-center overflow-hidden">
            {/* <div className="flex flex-col justify-center gap-2">
          <button
            className="bg-blue-500 h-8 w-32"
            onClick={() => {
              if (StructureType.current === "water") {
                placing.current = !placing.current;
              } else {
                StructureType.current = "water";
              }
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
            }}
          >
            place structure
          </button>
        </div> */}
            {/* <Image src={"/background_easter_egg.jpg"} alt="que miras bobo" fill /> */}

            <MessageSection />

            <InboxSection />

            <PlayerGold />

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
                    className="block w-auto p-2 text-center bg-[#f7cd8d] font-comic mt1 text-[#b7632b] border-[3px] border-[#b7632b] rounded-lg font-bold uppercase duration-200 z-5"
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
          </div>
        </BuildingContext.Provider>
      )}
    </>
  );
}
