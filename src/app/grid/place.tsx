import {
  useState,
  useEffect,
  memo,
  MutableRefObject,
  useContext,
  useRef,
  use,
} from "react";
import Image from "next/image";
import { mapPlace, DefaultMap } from "./mapData";
import { changeMap, currentMap } from "../worldMap/continents";
import { useBuldingContext } from "./BuildingContext";
import Building from "./building";
import { getUserBuildings, postUserBuildings } from "../server/userBuilding";
import { useSession } from "next-auth/react";
import {
  getUserInstanceById,
  updateUserInstance,
} from "../server/userInstance";
import { useBuildingsStore } from "../store/userBuildings";
import { UserBuildings } from "../types";
import { useUserStore } from "../store/user";
import { updateData } from "../logic/production";
import dayjs from "dayjs";
import { useBoostStore } from "../store/boosts";
import { set } from "mongoose";
import { updateBuilding as BuildingUpdate } from "../server/userBuilding";
import build from "next/dist/build";

function Place({
  mapPlace,
  position,
}: {
  mapPlace: mapPlace;
  position: { row: number; column: number };
}) {
  const [isOccupied, setIsOccupied] = useState(mapPlace.occupied);
  const [hover, setHover] = useState(false);
  const [buildingMenu, setBuildingMenu] = useState<boolean>(false); // State to control the building menu visibility
  const [upgradeScreen, setUpgradeScreen] = useState<boolean>(false); // State to control the upgrade screen visibility
  // const [building, setBuilding] = useState<any>(null); // State to store the selected building data
  const building = useRef<UserBuildings>();
  const userBuilding = useBuildingsStore((state) => state.userBuilding);
  const userBuildings = useBuildingsStore((state) => state.userBuildings);
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const updateMaterials = useUserStore((state) => state.updateMaterials);
  const boost = useBoostStore((state) => state.boost);
  const fetchBuilding = useBuildingsStore((state) => state.fetchBuilding);
  const updateBuilding = useBuildingsStore((state) => state.updateProduction);
  const upgradeBuildingZ = useBuildingsStore((state) => state.upgradeBuilding);
  const updateAllMaterials = useUserStore((state) => state.updateAllMaterials);

  // console.log(user.materials.lumber)

  function updateBuildingData() {
    // console.log(building.current!._id)
    // fetchBuilding(building.current!._id); Remeber you commented this line
    // console.log(userBuilding);
    const newData = updateData(userBuilding, boost);
    updateBuilding(newData, false);
    setBuildingMenu(!buildingMenu);
    // fetchBuilding(userBuilding._id);
  }

  function handleCollected() {
    // console.log(userBuilding)
    const materialName = userBuilding.name.split(" ");
    // console.log(materialName[0])
    updateMaterials(materialName[0], userBuilding.capacity);
    // updateMaterials();
    updateBuilding(0, true);
  }

  function upgradeBuilding() {
    if (
      user.materials[0].quantity < userBuilding.cost / 2 ||
      user.materials[1].quantity < userBuilding.cost * 0.75 ||
      user.gold < userBuilding.cost * 2
    ) {
      console.log("Not enough resources to upgrade building");
      return;
    } else {
      const Img = userBuilding.img.split(".");
      const newImg = `${Img[0]}${userBuilding.level + 1}.png`;
      console.log(newImg);
      userBuilding.img = newImg;
      userBuilding.level = userBuilding.level + 1;
      userBuilding.prod_per_hour = userBuilding.prod_per_hour + 1;
      userBuilding.cost = userBuilding.cost * 2;
      userBuilding.maxCapacity = userBuilding.maxCapacity * 2;
      userBuilding.maxWorkers = userBuilding.maxWorkers * 2;
      // updateAllMaterials(
      //   user.materials[0].quantity - userBuilding.cost / 2,
      //   user.materials[1].quantity - userBuilding.cost * 0.75,
      //   user.gold - userBuilding.cost * 2
      // );
      upgradeBuildingZ(userBuilding);
      setBuildingMenu(!buildingMenu);
      setUpgradeScreen(!upgradeScreen);
    }
  }

  const context = useBuldingContext(); //this is great, it imports states from other components

  const StructureType = context.StructureType;
  const BuildMode = context.placing;

  const handleClick = async () => {
    if (BuildMode.current && !isOccupied) {
      // DefaultMap[position.row][position.column].occupied = true;
      // DefaultMap[position.row][position.column].structureType =
      //   StructureType.current.name;

      changeMap(
        {
          occupied: true,
          structureType: StructureType.current.name,
          strutctureID: null,
          text: "",
        },
        position.row,
        position.column
      );
      try {
        const currentDay = dayjs();
        const createdBuilding = await postUserBuildings(
          StructureType.current,
          user.userId,
          currentDay.toDate(),
          { x: position.row, y: position.column }
        );

        // Update building.current with the created building
        building.current = createdBuilding;
        console.log(building.current);
        fetchUser(user.userId);

        if (user.gold >= building.current!.cost) {
          setBuildingMenu(false);
          updateUserInstance({
            ...user,
            gold: user.gold - building.current!.cost,
          });
          fetchUser(user.userId);
        }

        BuildMode.current = false;
        setIsOccupied(true);
        setHover(false);
      } catch (error) {
        console.error("Algo paso ", error);
      }
    }
  };

  useEffect(() => {
    userBuildings.forEach((buildingItem) => {
      if (
        position.row === buildingItem.position.x &&
        position.column === buildingItem.position.y
      ) {
        // DefaultMap[position.row][position.column].occupied = true;
        // DefaultMap[position.row][position.column].structureType =
        //   buildingItem.name;
        changeMap(
          {
            occupied: true,
            structureType: buildingItem.name,
            strutctureID: null,
            text: "",
          },
          position.row,
          position.column
        );
        building.current = buildingItem;
        setIsOccupied(true);
      }
    });
  }, []);

  // alreadyOccupied()

  return (
    <div className="min-h-10 min-w-10 flex">
      <div
        className={`min-h-10 min-w-10 ${
          BuildMode.current
            ? hover
              ? isOccupied
                ? "bg-red-500"
                : "bg-green-500"
              : ""
            : ""
        } flex items-center justify-center select-none z-10`}
        onClick={() => {
          handleClick();
          if (
            isOccupied &&
            !BuildMode.current &&
            currentMap[position.row][position.column].structureType !== "water"
          ) {
            fetchBuilding(building.current!._id);
            updateBuildingData();
            // console.log("Building clicked", building.current);
          }
        }}
        onMouseOver={() => {
          BuildMode.current ? setHover(true) : null;
        }}
        onMouseLeave={() => (BuildMode.current ? setHover(false) : null)}
      >
        {/* <Building buildingName={StructureType.current} /> */}
        {hover && <Building buildingName={StructureType.current.name} />}
      </div>
      {buildingMenu && building.current && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-[330px] h-[250px] bg-[#f7cd8d] border-[3px] border-[#b7632b]">
          <p
            className="absolute top-[-14px] right-0 text-[#6a1e07] font-comic mt-1 text-xl"
            onClick={() => {
              setBuildingMenu(false);
            }}
          >
            x
          </p>
          <div className="flex flex-row items-center justify-center">
            <img
              key={building.current.name}
              src={building.current.img}
              width={120}
              height={130}
              alt={building.current.name}
            />
            <div className="ml-4 flex flex-col">
              <h2 className="text-[#6a1e07] font-comic mt1">
                {userBuilding.name}
              </h2>
              <h2 className="text-[#6a1e07] font-comic mt1">
                Level: {userBuilding.level}
              </h2>
              {userBuilding.name !== "Barracs" ? (
                <>
                  <h2 className="text-[#6a1e07] font-comic mt1">
                    {userBuilding.prod_per_hour
                      ? `Production: ${userBuilding.prod_per_hour}/min`
                      : null}{" "}
                  </h2>

                  <h2 className="text-[#6a1e07] font-comic mt1">
                    {userBuilding.capacity} / {userBuilding.maxCapacity}
                  </h2>
                </>
              ) : null}
              <h2 className="text-[#6a1e07] font-comic mt1">
                Upgrade cost: {userBuilding.cost * 2}
              </h2>
              {userBuilding.name === "Barracs" ? (
                <h2 className="text-[#6a1e07] font-comic mt1">
                  Worker cost: 200
                </h2>
              ) : (
                <h2 className="text-[#6a1e07] font-comic mt1">
                  Workerers Asigned: {userBuilding.workers}/
                  {userBuilding.maxWorkers}
                </h2>
              )}
            </div>
          </div>
          <div className="flex flex-row">
            <div
              className="relative flex items-center pr-2 justify-center hover:brightness-75 active:transition-none active:scale-90 mt-10"
              onClick={() => {
                // StructureType.current = selectedItem;
                // BuildMode.current = true;
                // setBuildingMenu(false);
                setUpgradeScreen(true);
                console.log("Upgrade building");
              }}
            >
              <p className="absolute inset-0 flex items-center justify-center text-[#6a1e07] font-comic">
                Upgrade
              </p>
              <Image
                src="/BuildButton.png"
                width={80}
                height={80}
                alt="buildingButton"
                className="hover:brightness-75"
              />
            </div>
            {userBuilding.name === "Barracs" ? (
              <div
                className="relative flex items-center justify-center hover:brightness-75 active:transition-none active:scale-90 mt-10"
                onClick={() => {
                  // handleCollected();
                  fetchUser(user.userId);
                  if (user.gold >= 200) {
                    setBuildingMenu(false);
                    updateUserInstance({
                      ...user,
                      units: user.units + 1,
                      gold: user.gold - 200,
                    });
                    fetchUser(user.userId);
                  }

                  // console.log("collected");
                }}
              >
                <p className="absolute inset-0 flex items-center justify-center text-c text-[#6a1e07] font-comic text-xs">
                  Hire Worker
                </p>
                <Image
                  src="/BuildButton.png"
                  width={80}
                  height={80}
                  alt="buildingButton"
                  className="hover:brightness-75"
                />
              </div>
            ) : (
              <>
                <div
                  className="relative flex items-center justify-center hover:brightness-75 active:transition-none active:scale-90 mt-10"
                  onClick={() => {
                    handleCollected();
                    setBuildingMenu(false);
                    fetchUser(user.userId);
                    // console.log("collected");
                  }}
                >
                  <p className="absolute inset-0 flex items-center justify-center text-[#6a1e07] font-comic">
                    Collect
                  </p>
                  <Image
                    src="/BuildButton.png"
                    width={80}
                    height={80}
                    alt="buildingButton"
                    className="hover:brightness-75"
                  />
                </div>
                <div
                  className="relative flex items-center justify-center hover:brightness-75 active:transition-none active:scale-90 mt-10 ml-2"
                  onClick={() => {
                    updateUserInstance({
                      ...user,
                      units: user.units - 1,
                    });
                    fetchUser(user.userId);
                    if (
                      building.current!.maxWorkers > building.current!.workers
                    ) {
                      setBuildingMenu(false);
                      fetchUser(user.userId);
                      BuildingUpdate({
                        ...building.current,
                        workers: building.current!.workers + 1,
                      });
                      console.log(building.current!.workers);
                      fetchBuilding(building.current!._id);
                      // updateBuildingData();
                      // console.log("collected");
                    }
                  }}
                >
                  <p className="absolute inset-0 flex items-center justify-center text-[#6a1e07] font-comic text-xs">
                    Asign Worker
                  </p>
                  <Image
                    src="/BuildButton.png"
                    width={80}
                    height={80}
                    alt="buildingButton"
                    className="hover:brightness-75"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {upgradeScreen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-[330px] h-[350px] bg-[#f7cd8d] border-[3px] border-[#b7632b]">
          <p
            className="absolute top-[-14px] right-0 text-[#6a1e07] font-comic mt-1 text-xl"
            onClick={() => {
              setUpgradeScreen(false);
            }}
          >
            ×
          </p>
          <div className="flex flex-row items-center justify-center">
            <Image
              key={building.current!.name}
              src={building.current!.img}
              width={120}
              height={130}
              alt={building.current!.name}
            />
            <div className="ml-4 flex flex-col">
              <h2 className="text-[#6a1e07] font-comic mt-1">
                {userBuilding.name}
              </h2>
              <h2 className="text-[#6a1e07] font-comic mt-1">
                Level: {userBuilding.level + 1}
              </h2>
              <h2 className="text-[#6a1e07] font-comic mt-1">
                Production Per Minute: {userBuilding.prod_per_hour + 0.5}
              </h2>
              <h1 className="text-[#6a1e07] font-comic mt-1">Cost:</h1>
              <h2 className="text-[#6a1e07] font-comic mt-1">
                Wood: {userBuilding.cost / 2} <br />
                Stone: {userBuilding.cost * 0.75} <br />
                Gold: {userBuilding.cost * 2} <br />
              </h2>
            </div>
          </div>
          <div className="flex flex-row">
            <div
              className="relative flex items-center pr-2 justify-center hover:brightness-75 active:transition-none active:scale-90 mt-10"
              onClick={() => {
                upgradeBuilding();
              }}
            >
              <p className="absolute inset-0 flex items-center justify-center text-[#6a1e07] font-comic">
                Upgrade
              </p>
              <Image
                src="/BuildButton.png"
                width={120}
                height={130}
                alt="Upgrade button"
              />
            </div>
          </div>
        </div>
      )}
      <Image
        className="absolute z-[9]"
        src={"/grassTop.jpg"}
        width={40}
        height={40}
        alt="minecraft_grass_top"
      />
      {isOccupied && (
        <div className="z-[9] absolute">
          <Building
            buildingName={
              currentMap[position.row][position.column].structureType
            }
          />
        </div>
      )}
    </div>
  );
}

export default memo(Place);

// <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-[330px] h-[250px] bg-[#f7cd8d] border-[3px] border-[#b7632b]">
//         {building.current.name}< br />
//         Production per minute: {building.current.prod_per_hour}<br />
//         Workers: {building.current.workers} <br />
//         capacity: {building.current.capacity} / {building.current.maxCapacity}
//       </div>
