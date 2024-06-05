import Router from "next/router";

export const getAllUserInstances = async() => {
  try {
    const res = await fetch('/api/userInstance', { cache: 'no-store' }) //Fetches the information, and sets the cache to no-store*
    if(!res.ok) {
      throw new Error("failed to fetch data")
    } 
    const data = await res.json()
    return data.instance
  } catch (error) {
    console.log("Error loading buildings:", error)
  }
}

export async function getUserInstanceById(userId: string) {
  try {
    console.log(`http://localhost:3000/api/user_instance?userId=${userId}`)
    const res = await fetch(`/api/user_instance?userId=${userId}`, 
    { 
      cache: 'no-store',
      method: "GET"    
    }) //Fetches the information, and sets the cache to no-store*
     //Fetches the information, and sets the cache to no-stsore*
    if(!res.ok) {
      throw new Error("failed to fetch data")
    } 
    const data = await res.json()
    // console.log(data.instance)
    return data.instance
  } catch (error) {
    // console.log("Error loading userBuildings:", error)
  }
}

export async function postUserInstance(building: any, userId: number, lastCollected: Date, position: { x: number, y: number }) {
  // const router = useRouter();
  try {
    const res = await fetch("/api/userInstance", {
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