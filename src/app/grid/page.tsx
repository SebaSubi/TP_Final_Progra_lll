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
import { user } from "../construccion_logic/page";
import LoadingScreen from "./components/loadingScreen";
import { UserBuildings } from "../types";
import { useBoostStore } from "../store/boosts";
import BoostMenu from "./components/boostMenu";
import { getUserInstanceById } from "../server/userInstance";

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
    await signOut({ callbackUrl: "http://localhost:3000" });
  };

  console.log(user);
  async function getUserInstance(userId: string) {
    const instance = await getUserInstanceById(userId);
    console.log(instance);
  }
  if (user) {
    getUserInstance(user.userId);
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
          </div>
        </BuildingContext.Provider>
      )}
    </>
  );
}
