import Router from "next/router";
import { User } from "../types";

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
    return data.instance
  } catch (error) {
    // console.log("Error loading userBuildings:", error)
  }
}

export async function postUserInstance
(
  userId: string, 
  name: string, 
  level: number, 
  country: string, 
  boosts: any[], 
  units: any[], 
  gold: number, 
  materials: any[]
) {
  try {
    const res = await fetch("/api/numbers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",

      },
      body: JSON.stringify({ userId, name, level, country, boosts, units, gold, materials }) 
    });

    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
} //Search up musica de la maquina increible

export async function updateUserInstance(user: any) {
  const { _id, userId, country, __v, ...newUserData } = user
  try {
    const res = await fetch(`/api/user_instance?userId=${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUserData)
    });
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}