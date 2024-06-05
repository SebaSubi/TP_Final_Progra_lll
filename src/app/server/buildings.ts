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

export const getUserBuildings = async() => {
  try {
    const res = await fetch('http://localhost:3000/api/userBuildings', { cache: 'no-store' }) //Fetches the information, and sets the cache to no-store*
    if(!res.ok) {
      throw new Error("failed to fetch data")
    } //We check if the response is ok
    // console.log(res)
    const data = await res.json()
    console.log(data)
    return data.buildings;
  } catch (error) {
    console.log("Error loading userBuildings:", error)
  }
}

export async function postUserBuildings(building: any, userId: number, lastCollected: Date, position: { x: number, y: number }) {
  // const router = useRouter();
  try {
    const res = await fetch("http://localhost:3000/api/userBuildings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",

      },
      body: JSON.stringify({ ...building, userId, lastCollected, position}) 
    });

    // if(res.ok) {
    //   Router.push("/")
    // } else {
    //   throw new Error("Failed to create building")
    // }
  } catch (error) {
    console.log(error)
  }
} //Search up musica de la maquina increible