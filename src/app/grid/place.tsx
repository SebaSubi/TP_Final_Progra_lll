import { useState, useEffect, memo, MutableRefObject, useContext } from "react";
import Image from "next/image";
import { mapPlace, DefaultMap } from "./mapData";
import { useBuldingContext } from "./BuildingContext";
import Building from "./building";
import { getUserBuildings, postUserBuildings } from "../server/userBuilding";
import { useSession } from "next-auth/react";
import { getUserInstanceById } from "../server/userInstance";






function Place({
  mapPlace,
  position,
}: {
  mapPlace: mapPlace;
  position: { row: number; column: number };
}) {
  const [isOccupied, setIsOccupied] = useState(mapPlace.occupied);
  const [hover, setHover] = useState(false);
  // const [userBuildings, setUserBuildings] = useState<any[]>()
  // const [currentUser, setCurrentUser] = useState<any>()
  const context = useBuldingContext(); //this is great, it imports states from other components

  const StructureType = context.StructureType;
  const BuildMode = context.placing;
  const user = context.User
  const occupied = context.Occupied


  useEffect(() => { 
    setIsOccupied(mapPlace.occupied);
  }, [mapPlace.occupied, mapPlace.structureType, mapPlace.strutctureID]);



  const handleClick = () => {
    if (BuildMode.current && !isOccupied) {
      // setIsOccupied(true);   //this is not really necesary since the prop will automaticaly rerender the component because we're modifing the orignal array
      DefaultMap[position.row][position.column].occupied = true;
      DefaultMap[position.row][position.column].structureType =
        StructureType.current;
      // StructureType.current = 0;
      // console.log(user.current.userId) 
      postUserBuildings(StructureType.current, user.current.userId, new Date(), {x: position.row, y: position.column})
    }
  };

  function alreadyOccupied() {
    occupied.current.map((building) => {
      if(position.row == building.position.x && position.column == building.position.y) {
        DefaultMap[position.row][position.column].occupied = true;
        DefaultMap[position.row][position.column].structureType =
        building.name;
      }
    })
  }

  alreadyOccupied() 

  return (
    <div className="h-full w-full flex">
      <div
        className={`h-full w-full ${
          BuildMode.current
            ? hover
              ? isOccupied
                ? "bg-red-500"
                : "bg-green-500"
              : ""
            : ""
        } flex items-center justify-center select-none z-10`}
        onClick={handleClick}
        onMouseOver={() => {
          BuildMode.current ? setHover(true) : null;
        }}
        onMouseLeave={() => (BuildMode.current ? setHover(false) : null)}
      >
        {/* <Building buildingName={StructureType.current} /> */}
        {hover && <Building buildingName={StructureType.current.name} />}
      </div>

      {/* <Image    //this is going tio be the building i the place
        className="absolute z-[9]"
        src={isOccupied ? "/minecraftWater.png" : "/minecraft_grass_top.png"}
        width={40}
        height={40}
        alt="minecraft_grass_top"
      /> */}

      {isOccupied ? (
        DefaultMap[position.row][position.column].structureType != "" ? (
          DefaultMap[position.row][position.column].structureType ===
          "water" ? (
            <Image
              className="absolute z-[9]"
              src={"/minecraftWater.png"}
              width={40}
              height={40}
              alt="minecraft_grass_top"
            />
          ) : (
            <>
              <Image
                className="absolute z-[9]"
                src={"/minecraft_grass_top.png"}
                width={40}
                height={40}
                alt="minecraft_grass_top"
              />
              <Image //this hast to change for the building image
                className="absolute z-[9]"
                src={"/LumberCamp.png"}
                width={40}
                height={40}
                alt="building_x"
              />
            </>
          )
        ) : null
      ) : (
        <Image
          className="absolute z-[9]"
          src={"/minecraft_grass_top.png"}
          width={40}
          height={40}
          alt="minecraft_grass_top"
        />
      )}
    </div>
  );
}

export default memo(Place);

  // console.log(occupied)


  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userId = user.userId; // replace this with actual user ID
  //     const userData = await getUserInstanceById(userId);
  //     if(userData) {
  //       setCurrentUser(userData);
  //       console.log(userData)
  //     }

  //   };

  //   fetchUser();
  // }, []);

  // console.log(user.current.userId)

  // useEffect(() => {
    // const fetchUserInstance = async () => {
    //   if((session?.user as any)?._id) {
    //     // console.log(userId)
    //     const instanceData = await getUserInstanceById((session?.user as any)?._id);
    //     setCurrentUser(instanceData);
    //     user.current = instanceData
    //     console.log(currentUser)
    //   }

    // };

    // fetchUserInstance();
    
  //   const fetchUserBuildings = async () => {
  //     const userBuildingsData = await getUserBuildings(user.current.userId);
  //     console.log(userBuildingsData)
  //     if (Array.isArray(userBuildingsData)) {
  //       setUserBuildings(userBuildingsData);
  //     } else {
  //       console.error(
  //         "Failed to fetch buildings data, received:",
  //         userBuildings
  //       );
  //     }
  //   };
  //   if(user.current.userId != null) {
  //     fetchUserBuildings();
  //   }
    
  // }, [user, userBuildings]);

    // function loadBuildings() {
  //   if(userBuildings) {
  //     userBuildings.map((building) => {
  //       DefaultMap[building.position.x][building.position.y].occupied = true;
  //       DefaultMap[building.position.x][building.position.y].structureType = StructureType.current;
  //     })
  //   }
  // }
  // loadBuildings()