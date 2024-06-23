import { Dayjs } from "dayjs";
import Router from "next/router";
import { UserBuildings } from "../types";

export const getGeneralBuildings = async () => {
  try {
    const res = await fetch('/api/buildings', { cache: 'no-store' }) //Fetches the information, and sets the cache to no-store*
    if (!res.ok) {
      throw new Error("failed to fetch data")
    } //We check if the response is ok\
    // console.log(res)
    const data = await res.json()
    return data.buildings;
  } catch (error) {
    console.log("Error loading buildings:", error)
  }
}

export async function getUserBuildings(userId: string) {
  // console.log(userId)
  try {
    const res = await fetch(`/api/userBuildings?userId=${userId}`,
      {
        cache: 'no-store',
        method: 'GET'
      }
    ) //Fetches the information, and sets the cache to no-store*
    if (!res.ok) {
      throw new Error("failed to fetch data")
    } //We check if the response is ok
    const data = await res.json()
    // console.log(data)
    return data.buildings;
  } catch (error) {
    console.log("Error loading userBuildings:", error)
  }
}

export async function postUserBuildings(building: any, userId: string, lastCollected: Date, position: { x: number, y: number }) {
  // const router = useRouter();
  const { _id, ...buildingWithoutId } = building;
  try {
    const res = await fetch("/api/userBuildings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",

      },
      body: JSON.stringify({ ...buildingWithoutId, userId, lastCollected, position, capacity: 0 })
    });
    const responseData = await res.json()
    const createdBuilding = responseData.building
    // console.log(createdBuilding)
    return createdBuilding

    // console.log(JSON.stringify({ ...buildingWithoutId, userId, lastCollected, position, capacity: 0}))
  } catch (error) {
    console.log(error)
  }
} //Search up musica de la maquina increible

export async function updateBuilding(building: any) {
  // const { _id, userId, country, __v, ...newUserData } = user
  const { _id, userId, __v, position, ...newBuildingData } = building
  console.log(JSON.stringify(newBuildingData))
  console.log(building._id)

  try {
    const res = await fetch(`/api/userBuildings/${building._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newBuildingData)
    });
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}