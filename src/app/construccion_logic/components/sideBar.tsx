import Image from "next/image";
import { useEffect, useState } from "react";
import { getGeneralBuildings } from "@/app/server/userBuilding";
import { useBuldingContext } from "../../grid/BuildingContext";
import { useUserStore } from "@/app/store/user";
import { useBoostStore } from "@/app/store/boosts";
import { Boost } from "@/app/types";

const defaultBoosts: Boost[] = [
  {
    id: 1,
    name: "Mate",
    type: "mate",
    img: "/Mate.png",
    quantity: 0,
    boost: 1.5,
    cost: 500,
  },
  {
    id: 2,
    name: "Facturas",
    type: "facturas",
    img: "/Facturas.png",
    quantity: 0,
    boost: 1.2,
    cost: 350,
  },
  {
    id: 3,
    name: "P11",
    type: "p11",
    img: "/p11.png",
    quantity: 0,
    boost: 3.0,
    cost: 3000,
  },
];

function isBoost(boost: Boost): boolean {
  return defaultBoosts.some((defaultBoost) => defaultBoost.name === boost.name);
}

export default function SideBar() {
  const [buildingSideBar, setBuildingSideBar] = useState<boolean>(false);
  const [boostSideBar, setBoostSideBar] = useState<boolean>(false);
  const [buildings, setBuildings] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [buildingMenu, setBuildingMenu] = useState<boolean>(false);
  const context = useBuldingContext();

  const StructureType = context.StructureType;
  const BuildMode = context.placing;
  const user = useUserStore((state) => state.user);
  const chargeAndAddBoost = useUserStore((state) => state.buyBoost);
  const boosts = useBoostStore((state) => state.boosts);
  const setBoost = useBoostStore((state) => state.setBoost);
  const updateUserBoost = useUserStore((state) => state.useBoost);

  // console.log(user.gold);
  // user.materials.map((material: any) => {
  //   console.log(material);
  // })

  useEffect(() => {
    const fetchBuildings = async () => {
      const buildingsData = await getGeneralBuildings();
      if (Array.isArray(buildingsData)) {
        setBuildings(buildingsData);
      } else {
        console.error(
          "Failed to fetch buildings data, received:",
          buildingsData
        );
      }
    };

    fetchBuildings();
  }, []);

  const SideBarBuildings = ({
    building,
    user,
  }: {
    building: any;
    user: any;
  }) => {
    if (user.level >= building.unlock_level) {
      return (
        <div
          className="sidebar-icon group"
          onClick={() => {
            setBuildingMenu(!buildingMenu);
            setSelectedItem(building);
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

  const SideBarBoosts = ({ boost }: { boost: Boost }) => {
    return (
      <div
        className="sidebar-icon group"
        onClick={() => {
          setBuildingMenu(!buildingMenu);
          setSelectedItem(handleSelectedBoosts(boost));
        }}
      >
        <Image
          key={boost.name}
          src={boost.img}
          width={60}
          height={70}
          alt={boost.name}
        />
        <span className="sidebar-name group-hover:scale-100">
          {boost.name}
          <br />
          Cost: {boost.cost}
        </span>
      </div>
    );
  };

  function handleSelectedBoosts(boost: Boost) {
    const foundBoost = boosts.find((b: Boost) => b.name === boost.name);
    return foundBoost ? foundBoost : boost;
  }

  function buyBoost(boost: Boost) {
    // console.log();
    if (user.gold >= boost.cost) {
      // console.log(boost.cost)
      chargeAndAddBoost(boost);
      return true;
    } else {
      return false;
    }
  }

  function setAndUpdateBoost(name: string) {
    //We set the boost
    setBoost(name);
    //We delete the boost from the database
    updateUserBoost(name);
  }
  // console.log(user);

  return (
    <>
      {buildingMenu && selectedItem && (
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
            <Image
              key={selectedItem.name}
              src={selectedItem.img}
              width={120}
              height={130}
              alt={selectedItem.name}
            />
            <div className="ml-4 flex flex-col">
              <h2 className="text-[#6a1e07] font-comic mt1">
                {selectedItem.name}
              </h2>
              <h2 className="text-[#6a1e07] font-comic mt1">
                {isBoost(selectedItem)
                  ? `Quantity: ${selectedItem.quantity}`
                  : selectedItem.prod_per_hour
                  ? `Production: ${selectedItem.prod_per_hour}`
                  : ""}
              </h2>
              <h2 className="text-[#6a1e07] font-comic mt1">
                Cost: {selectedItem.cost}
              </h2>
              <h2 className="text-[#6a1e07] font-comic mt1">
                {isBoost(selectedItem)
                  ? `boost: ${selectedItem.boost}`
                  : selectedItem.prod_per_hour
                  ? `Production: ${selectedItem.prod_per_hour}`
                  : ""}
              </h2>
            </div>
          </div>
          {isBoost(selectedItem) ? (
            <div className="flex flex-row">
              <div
                className="relative flex items-center justify-center pr-1 hover:brightness-75 active:transition-none active:scale-90 mt-10"
                onClick={() => {
                  buyBoost(selectedItem);
                  setBuildingMenu(false);
                }}
              >
                <p className="absolute inset-0 flex items-center justify-center text-[#6a1e07] font-comic">
                  Buy
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
                className="relative flex items-center justify-center hover:brightness-75 active:transition-none active:scale-90 mt-10"
                onClick={() => {
                  setAndUpdateBoost(selectedItem.name);
                  setBuildingMenu(false);
                }}
              >
                <p className="absolute inset-0 flex items-center justify-center text-[#6a1e07] font-comic">
                  {selectedItem.quantity > 0 ? "Use" : "--"}
                </p>
                <Image
                  src="/BuildButton.png"
                  width={80}
                  height={80}
                  alt="buildingButton"
                  className="hover:brightness-75"
                />
              </div>
            </div>
          ) : (
            <div
              className="relative flex items-center justify-center hover:brightness-75 active:transition-none active:scale-90 mt-10"
              onClick={() => {
                StructureType.current = selectedItem;
                BuildMode.current = true;
                setBuildingMenu(false);
              }}
            >
              <p className="absolute inset-0 flex items-center justify-center text-[#6a1e07] font-comic">
                Build
              </p>
              <Image
                src="/BuildButton.png"
                width={80}
                height={80}
                alt="buildingButton"
                className="hover:brightness-75"
              />
            </div>
          )}
        </div>
      )}

      <main className="relative z-20">
        <div
          className={`fixed top-0 left-[-100px] h-screen w-[100px] m-0 flex flex-col bg-[#f7cd8d] border-[3px] border-[#b7632b] shadow-md transition-all duration-300 ${
            buildingSideBar || boostSideBar
              ? "translate-x-full"
              : "translate-x-0"
          }`}
        >
          {boostSideBar &&
            (defaultBoosts.length > 0 && user ? (
              defaultBoosts.map((boost: Boost, index: number) => (
                // console.log(boost),
                <SideBarBoosts boost={boost} key={index} />
              ))
            ) : (
              <p>No boosts available</p>
            ))}

          {buildingSideBar &&
            (buildings.length > 0 && user ? (
              buildings.map((building: any, index: number) => (
                <SideBarBuildings building={building} user={user} key={index} />
              ))
            ) : (
              <p>No buildings available</p>
            ))}
        </div>
        <div
          className={`fixed top-0 left-1 transition-all duration-300 transform ${
            buildingSideBar || boostSideBar
              ? "translate-x-[100px]"
              : "translate-x-0"
          } active:transition-none active:scale-90`}
          onClick={() => {
            if (boostSideBar) {
              setBoostSideBar(false);
              setBuildingSideBar(true);
            } else {
              setBuildingSideBar(!buildingSideBar);
            }
          }}
        >
          <Image
            src="/SidebarMenuIcon.png"
            width={30}
            height={30}
            alt="SidebarMenuIcon"
            className="hover:brightness-75"
          />
        </div>
        <div
          className={`fixed top-8 left-1 transition-all duration-300 transform ${
            buildingSideBar || boostSideBar
              ? "translate-x-[100px]"
              : "translate-x-0"
          } active:transition-none active:scale-90`}
          onClick={() => {
            if (buildingSideBar) {
              setBuildingSideBar(false);
              setBoostSideBar(true);
            } else {
              setBoostSideBar(!boostSideBar);
            }
          }}
        >
          <Image
            src="/BoostMenuIcon.png"
            width={30}
            height={30}
            alt="BoostMenuIcon"
            className="hover:brightness-75"
          />
        </div>
      </main>
    </>
  );
}
