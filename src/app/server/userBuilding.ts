import Router from "next/router";

export const getGeneralBuildings = async() => {
  try {
    const res = await fetch('http://localhost:3000/api/buildings', { cache: 'no-store' }) //Fetches the information, and sets the cache to no-store*
    if(!res.ok) {
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
    const res = await fetch(`http://localhost:3000/api/userBuildings?userId=${userId}`, 
      { 
        cache: 'no-store',
        method: 'GET'
      }
  ) //Fetches the information, and sets the cache to no-store*
    if(!res.ok) {
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
    const res = await fetch("http://localhost:3000/api/userBuildings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",

      },
      body: JSON.stringify({ ...buildingWithoutId, userId, lastCollected, position, capacity: 0}) 
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