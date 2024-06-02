'use client';

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "@/app/objects/user";
import { getGeneralBuildings } from "@/app/server/buildings"; // Ensure this import is correct

// The main SideBar component
export default function SideBar({
  user,
  setStructure,
}: {
  user: User;
  setStructure: Dispatch<SetStateAction<string | null>>;
}) {
  // State to control the sidebar visibility
  const [sideBar, setSideBar] = useState<boolean>(true);
  // State to store the fetched buildings data
  const [buildings, setBuildings] = useState<any[]>([]);

  // Fetch buildings data when the component mounts
  useEffect(() => {
    const fetchBuildings = async () => {
      const buildingsData = await getGeneralBuildings();
      if (Array.isArray(buildingsData)) {
        setBuildings(buildingsData);
      } else {
        console.error("Failed to fetch buildings data, received:", buildingsData);
      }
    };

    fetchBuildings();
  }, []);

  // Component to render each building icon in the sidebar
  const SideBarIcon = ({
    building,
    user,
  }: {
    building: any;
    user: User;
  }) => {
    if (user.level >= building.unlock_level) {
      // Render the building icon if the user's level is sufficient
      return (
        <div
          className="sidebar-icon group"
          onClick={() => {
            setStructure(building);
            // console.log("This is the building ID: " + building._id);
          }}
        >
          <Image
            key={building.name}
            src={building.img}
            width={60}
            height={70}
            alt={building.name}
          />
          <span className="sidebar-name group-hover:scale-100">
            {building.name}
            <br />
            Production per hour: {building.prod_per_hour}
            <br />
            Cost: {building.cost}
            <br />
            Workers: {building.workers}
          </span>
        </div>
      );
    } else {
      // Render a message if the user's level is insufficient
      return (
        <div className="min-lev-req group">
          <i className="opacity-20">
            <Image
              key={building.name}
              src={building.img}
              width={60}
              height={70}
              alt={building.name}
            />
          </i>
          <span className="sidebar-name group-hover:scale-100 opacity-80 flex flex-col">
            <div>{`You must be Level: ${building.unlock_level} to unlock ${building.name}`}</div>
            <div>{`Current Level: ${user.level}`}</div>
          </span>
        </div>
      );
    }
  };

  // Render the sidebar with building icons
  return (
    <main>
      <div
        className={`fixed top-0 left-[-100px] h-screen w-[100px] m-0 flex flex-col bg-gray-800 shadow-md transition-all duration-300 ${
          sideBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {Array.isArray(buildings) && buildings.length > 0 ? (
          buildings.map((building: any, index: number) => (
            <SideBarIcon building={building} user={user} key={index} />
          ))
        ) : (
          <p>No buildings available</p>
        )}
      </div>
      <div>
        <button
          className={`fixed top-0 left-[5px] transition-all duration-300 ${
            sideBar ? "translate-x-0" : "translate-x-[100px]"
          }`}
          onClick={() => {
            setSideBar(!sideBar);
          }}
        >
          Side Bar
        </button>
      </div>
    </main>
  );
}
